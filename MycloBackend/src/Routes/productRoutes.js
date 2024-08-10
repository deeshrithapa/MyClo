const express = require('express');
const router = express.Router();

// Import middleware
const authMiddleware = require('../Middleware/authMiddleware');
const authorizeRole = require('../Middleware/authorizationMiddleware');
const { productImage } = require('../Middleware/uploadMiddleware');

// Import controller functions
const productsController = require('../Controllers/productController');

// Routes
/**
 * @description Create a new product
 * @route POST /api/products/create
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the created product
 */
router.post('/create', authMiddleware, productImage.single('productImage'), authorizeRole('admin'), productsController.createProduct);

/**
 * @description Get all products
 * @route GET /api/products/all
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing an array of products
 */
router.get('/all', productsController.getAllProducts);

/**
 * @description Get a single product by ID
 * @route GET /api/products/:id
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the product data
 */
router.get('/:id', productsController.getProductById);

/**
 * @description Update an existing product
 * @route PUT /api/products/update/:id
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the updated product
 */
router.put('/update/:id', authMiddleware, productImage.single('productImage'), authorizeRole('admin'), productsController.updateProduct);

/**
 * @description Delete a product
 * @route DELETE /api/products/delete/:id
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object confirming deletion
 */
router.delete('/delete/:id', authMiddleware, authorizeRole('admin'), productsController.deleteProduct);

module.exports = router;
