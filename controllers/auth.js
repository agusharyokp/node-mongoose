
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'agustinus.haryo@ti.ukdw.ac.id',
      pass: 'your gmail app password',
  }
});

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];  
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email})
      .then(user => {
          if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
          }

          //validate the password
          bcrypt
            .compare(password, user.password)
            .then(doMatch => {
              if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                  console.log(err);
                  return res.redirect('/');
                });
              }
              req.flash('error', 'Invalid email or password');
              return res.redirect('/login');
            })
            .catch(err => {
              console.log(err);
              return res.redirect('/login');
            });
      })
      .catch(err => {
          console.log(err);
      }); 
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];  
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isLoggedIn: false,
    errorMessage: message
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User
    .findOne({email: email})
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'Email already exists');
        return res.redirect('/signup');
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save(); 
      })
      .then(() => {
        res.redirect('/login');

        return transporter.sendMail({
            to: email,
            from: 'agustinus.haryo@ti.ukdw.ac.id',
            subject: 'Signup succeeded',
            html: '<h1>You successfully signed up!</h1>'
        }).catch(error => {
            console.log('error = ', error, '\n');
        });
      })
    })
    .catch(err => {
      console.log(err);
    });
};