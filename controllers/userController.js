/**
 * User Controller
 * Contains business logic for all user CRUD operations
 * Implements validation and error handling
 */

const fileHandler = require('../utils/fileHandler');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

/**
 * Validate user data
 * @param {Object} user - User object to validate
 * @param {boolean} isUpdate - Whether this is an update operation
 * @returns {Object} - { valid: boolean, errors: array }
 */
const validateUser = (user, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || user.name !== undefined) {
    if (!user.name || typeof user.name !== 'string' || user.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }
  }

  if (!isUpdate || user.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email || !emailRegex.test(user.email)) {
      errors.push('Valid email is required');
    }
  }

  if (!isUpdate || user.age !== undefined) {
    if (user.age !== undefined && (typeof user.age !== 'number' || user.age < 0 || user.age > 150)) {
      errors.push('Age must be a number between 0 and 150');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Generate unique ID for new users
 * @param {Array} users - Array of existing users
 * @returns {number} - New unique ID
 */
const generateId = (users) => {
  if (users.length === 0) return 1;
  const maxId = Math.max(...users.map(user => user.id));
  return maxId + 1;
};

/**
 * GET /users
 * Retrieve all users
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await fileHandler.readData(DATA_FILE);
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /users/:id
 * Retrieve a single user by ID
 */
exports.getUserById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID format. ID must be a number.'
      });
    }

    const users = await fileHandler.readData(DATA_FILE);
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User with ID ${userId} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /users
 * Create a new user
 */
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;
    
    // Validate user data
    const validation = validateUser({ name, email, age });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }

    const users = await fileHandler.readData(DATA_FILE);

    // Check if email already exists
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    // Create new user
    const newUser = {
      id: generateId(users),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      age: age || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    await fileHandler.writeData(DATA_FILE, users);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /users/:id
 * Update an existing user
 */
exports.updateUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID format. ID must be a number.'
      });
    }

    const { name, email, age } = req.body;

    // Validate at least one field is provided
    if (!name && !email && age === undefined) {
      return res.status(400).json({
        success: false,
        error: 'At least one field (name, email, or age) must be provided for update'
      });
    }

    // Validate provided fields
    const validation = validateUser({ name, email, age }, true);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }

    const users = await fileHandler.readData(DATA_FILE);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `User with ID ${userId} not found`
      });
    }

    // Check if email already exists (excluding current user)
    if (email) {
      const emailExists = users.some(u => 
        u.id !== userId && u.email.toLowerCase() === email.toLowerCase()
      );
      if (emailExists) {
        return res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }
    }

    // Update user fields
    if (name) users[userIndex].name = name.trim();
    if (email) users[userIndex].email = email.toLowerCase().trim();
    if (age !== undefined) users[userIndex].age = age;
    users[userIndex].updatedAt = new Date().toISOString();

    await fileHandler.writeData(DATA_FILE, users);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: users[userIndex]
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /users/:id
 * Delete a user
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID format. ID must be a number.'
      });
    }

    const users = await fileHandler.readData(DATA_FILE);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `User with ID ${userId} not found`
      });
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    await fileHandler.writeData(DATA_FILE, users);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });
  } catch (error) {
    next(error);
  }
};
