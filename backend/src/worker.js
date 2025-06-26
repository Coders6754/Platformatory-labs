const { Worker } = require('@temporalio/worker');
const { fileURLToPath } = require('url');
const path = require('path');
const dotenv = require('dotenv');

// Load activities
const activities = require('./temporal/activities');

dotenv.config();

async function run() {
  try {
    const worker = await Worker.create({
      workflowsPath: path.resolve(__dirname, 'temporal/workflows.js'),
      activities,
      taskQueue: 'user-profile-queue'
    });

    console.log('Worker starting... Listening for tasks on "user-profile-queue"');
    await worker.run();
  } catch (err) {
    console.error('Worker error:', err);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
}); 