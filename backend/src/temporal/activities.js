const User = require('../models/User');
const axios = require('axios');

// Activity to save user data to our database
async function saveUserToDb(userData) {
  try {
    const user = await User.findOneAndUpdate(
      { auth0Id: userData.auth0Id },
      userData,
      { new: true, upsert: true }
    );
    return user.toObject();
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
}

// Activity to update data in crudcrud.com service
async function updateCrudCrud(userData) {
  try {
    // Remove MongoDB specific fields before sending to crudcrud
    const { _id, __v, ...cleanUserData } = userData;
    
    // Get crudcrud API endpoint from environment variables
    const crudcrudApi = process.env.CRUD_CRUD_API;
    
    // Check if user exists in crudcrud by auth0Id
    let existingUser;
    try {
      const response = await axios.get(`${crudcrudApi}/users?auth0Id=${userData.auth0Id}`);
      existingUser = response.data?.[0];
    } catch (error) {
      console.log('User not found in crudcrud, will create a new one');
    }

    if (existingUser) {
      // Update existing user
      const response = await axios.put(
        `${crudcrudApi}/users/${existingUser._id}`,
        cleanUserData
      );
      console.log('User updated in crudcrud');
      return response.data;
    } else {
      // Create new user
      const response = await axios.post(
        `${crudcrudApi}/users`,
        cleanUserData
      );
      console.log('User created in crudcrud');
      return response.data;
    }
  } catch (error) {
    console.error('Error updating crudcrud:', error);
    throw error;
  }
}

module.exports = {
  saveUserToDb,
  updateCrudCrud
}; 