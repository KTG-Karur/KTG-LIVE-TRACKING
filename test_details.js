const { getVisitDetails } = require('./service/branch-location-entry-log-service');
const sequelize = require('./models/index').sequelize;

async function test() {
  try {
    const res = await getVisitDetails({ user_id: 12, date: '2026-06-22' });
    console.log('Result:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sequelize.close();
  }
}

test();
