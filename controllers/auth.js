
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();
const { validationResult } = require('express-validator');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
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
    errorMessage: message,
    oldInput: {email: '', password: ''},
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: 'Invalid email or password',
      oldInput: {email: email, password: password},
      validationErrors: errors.array()
    });
  }

  User.findOne({email: email})
      .then(user => {
          if (!user) {
            return res.status(422).render('auth/login', {
              path: '/login',
              pageTitle: 'Login',
              errorMessage: 'Invalid email or password',
              oldInput: {email: email, password: password},
              validationErrors: []
            });
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
              return res.status(422).render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                errorMessage: 'Invalid email or password',
                oldInput: {email: email, password: password},
                validationErrors: []
              });
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
    errorMessage: message,
    oldInput: {email: '', password: '', confirmPassword: ''},
    validationErrors: []
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isLoggedIn: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {email: email, password: password, confirmPassword: confirmPassword},
      validationErrors: errors.array()
    });
  }

  bcrypt
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
      .catch(error => {
        console.log(error);
        return res.redirect('/signup');
      });  
};

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];  
    } else {
      message = null;
    }
    res.render('auth/reset', {
      path: '/reset',
      pageTitle: 'Reset Password',
      errorMessage: message
    });
};

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
        return res.redirect('/reset');
      }

      const token = buffer.toString('hex');
      User.findOne({email: req.body.email})
        .then(user =>{
          if (!user) {
            req.flash('error', 'No user found');
            return res.redirect('/reset');
          }
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save();
        })
        .then(() =>{
          res.redirect('/');
          return transporter.sendMail({
            to: req.body.email,
            from: 'agustinus.haryo@ti.ukdw.ac.id',
            subject: 'Reset your password',
            html: `
              <p>You requested to reset your password.</p>
              <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password.</p>
            `
          });
        })
        .catch(err => {
          console.log(err);
          return res.redirect('/reset');
        });
    });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];  
      } else {
        message = null;
      }

      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: message,
        passwordToken: token,
        userId: user._id.toString(),
      });
    })
    .catch(err => {
      console.log(err);
      return res.redirect('/');
    });
}

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: {$gt: Date.now()},
    _id: userId
  })
    .then(user => {
      if (!user) {
        req.flash('error', 'No user found');
        return res.redirect('/reset');
      }
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = null;
      resetUser.resetTokenExpiration = null;
      return resetUser.save();
    })
    .then(() => {
      res.redirect('/login'); 
    })
    .catch(err => {
      console.log(err);
      return res.redirect('/');
    });
}
    