const User = require('../models/User');
const { Connection, Client } = require('@temporalio/client');

// Create Temporal client
async function getTemporalClient() {
  const connection = await Connection.connect();
  return new Client({ connection });
}

// Get current user profile
exports.getUserProfile = async (req, res) => {
  try {
    const auth0Id = req.oidc.user.sub;
    
    // Find user by auth0Id or create a new one if not found
    let user = await User.findOne({ auth0Id });
    
    if (!user) {
      user = new User({
        auth0Id,
        email: req.oidc.user.email || '',
        firstName: req.oidc.user.given_name || '',
        lastName: req.oidc.user.family_name || ''
      });
      await user.save();
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const auth0Id = req.oidc.user.sub;
    const { firstName, lastName, phoneNumber, city, pincode } = req.body;

    // Prepare user data for update
    const userData = {
      auth0Id,
      email: req.oidc.user.email,
      firstName,
      lastName,
      phoneNumber,
      city,
      pincode,
      updatedAt: new Date()
    };
    
    // Use Temporal workflow to handle the update
    const client = await getTemporalClient();
    
    const handle = await client.workflow.start('updateUserProfileWorkflow', {
      args: [userData],
      taskQueue: 'user-profile-queue',
      workflowId: `user-update-${auth0Id}-${Date.now()}`
    });
    
    console.log(`Started workflow with ID: ${handle.workflowId}`);
    
    // Don't await the workflow completion, return immediately
    res.status(202).json({ 
      message: 'Profile update in progress',
      workflowId: handle.workflowId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};

// Check workflow status
exports.checkWorkflowStatus = async (req, res) => {
  try {
    const { workflowId } = req.params;
    
    const client = await getTemporalClient();
    const handle = client.workflow.getHandle(workflowId);
    
    try {
      const status = await handle.describe();
      res.status(200).json({
        workflowId,
        status: status.status.name,
        runId: status.runId,
        startTime: status.startTime
      });
    } catch (error) {
      res.status(404).json({ message: 'Workflow not found', error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking workflow status', error: error.message });
  }
}; 