/**
 * File Handler Utility
 * Provides functions for reading and writing JSON data files
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Read data from JSON file
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<Array>} - Parsed JSON data
 */
exports.readData = async (filePath) => {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      // File doesn't exist, create it with empty array
      await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf8');
      return [];
    }

    // Read file
    const data = await fs.readFile(filePath, 'utf8');
    
    // Handle empty file
    if (!data || data.trim() === '') {
      return [];
    }

    // Parse and return data
    return JSON.parse(data);
  } catch (error) {
    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON in file:', filePath);
      throw new Error('Data file is corrupted. Please contact administrator.');
    }
    throw error;
  }
};

/**
 * Write data to JSON file
 * @param {string} filePath - Path to the JSON file
 * @param {Array} data - Data to write
 * @returns {Promise<void>}
 */
exports.writeData = async (filePath, data) => {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    // Write file with pretty formatting
    await fs.writeFile(
      filePath, 
      JSON.stringify(data, null, 2), 
      'utf8'
    );
  } catch (error) {
    console.error('Error writing to file:', error);
    throw new Error('Failed to save data. Please try again.');
  }
};

/**
 * Check if file exists
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>}
 */
exports.fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};
