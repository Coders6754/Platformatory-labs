const { proxyActivities, sleep } = require('@temporalio/workflow');

// Define activities that will be called from workflow
const { saveUserToDb, updateCrudCrud } = proxyActivities({
  startToCloseTimeout: '10 seconds'
});

// Main workflow function that saves user data and then updates crudcrud after a delay
async function updateUserProfileWorkflow(userData) {
  // First save the data to our database
  const savedUser = await saveUserToDb(userData);
  
  // Wait for 10 seconds before updating crudcrud
  console.log('Waiting 10 seconds before updating crudcrud...');
  await sleep('10 seconds');
  
  // Update crudcrud after the delay
  await updateCrudCrud(savedUser);
  
  return { message: 'User profile updated successfully', user: savedUser };
}

module.exports = {
  updateUserProfileWorkflow
}; 