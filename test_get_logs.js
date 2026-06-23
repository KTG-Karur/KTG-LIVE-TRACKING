const { getEntryLogs } = require('./service/branch-location-entry-log-service');
const sequelize = require('./models/index').sequelize;

async function test() {
  try {
    const res = await getEntryLogs({ staffId: 12 });
    console.log('Is Array?', Array.isArray(res));
    console.log('Result type:', typeof res);
    console.log('Result:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sequelize.close();
  }
}

test();
