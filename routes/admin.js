const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);
router.get('/products', adminController.getProducts);
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/add-product',
    [
        body('title')
            .isAlphanumeric()
            .isLength({min: 5})
            .trim()
            .withMessage('Title must be at least 5 characters long'),
        body('price')
            .isFloat()
            .withMessage('Price must be a number'),
        body('description')
            .isLength({min: 5})
            .trim()
            .withMessage('Description must be at least 5 characters long')
    ],
    isAuth,
    adminController.postAddProduct);

router.post('/edit-product',
    [
        body('title')
            .isLength({min: 5})
            .withMessage('Title must be at least 5 characters long'),
        body('price')
            .isFloat()
            .withMessage('Price must be a number'),
        body('description')
            .isLength({min: 5})
            .trim()
            .withMessage('Description must be at least 5 characters long')
    ],
    isAuth, adminController.postEditProduct);
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
