const express = require('express');
const { check, body } = require('express-validator');

const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/reset', authController.getReset);
router.get('/reset/:token', authController.getNewPassword);

router.post('/login', 
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email'),

        body('password', 'Please enter a password of at least 5 characters')
            .isLength({min: 5, max: 12})
            .isAlphanumeric()
    ],
    authController.postLogin);


router.post('/signup', 
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, { req }) => {
                return User.findOne({email: value})
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('Email already exists, please use another email');
                        }
                    })
            }),
        body(
            'password',
            'Please enter a password of at least 5 characters'
            )
            .isLength({min: 5, max: 12})
            .isAlphanumeric()
            .custom((value, { req }) => {
                if (value !== req.body.confirmPassword) {
                    throw new Error('Passwords do not match!');
                }
                return true;
            })
    ],
    authController.postSignup);
router.post('/logout', authController.postLogout);
router.post('/reset', authController.postReset);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
