/**
 * User Routes
 * Defines all endpoints for user CRUD operations
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', userController.getAllUsers);

/**
 * @route   GET /users/:id
 * @desc    Get single user by ID
 * @access  Public
 */
router.get('/:id', userController.getUserById);

/**
 * @route   POST /users
 * @desc    Create a new user
 * @access  Public
 */
router.post('/', userController.createUser);

/**
 * @route   PUT /users/:id
 * @desc    Update user by ID
 * @access  Public
 */
router.put('/:id', userController.updateUser);

/**
 * @route   DELETE /users/:id
 * @desc    Delete user by ID
 * @access  Public
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
