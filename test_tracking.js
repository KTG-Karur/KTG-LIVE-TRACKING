const { getEmployeeTracking } = require('./service/employee-time-intervals-service');
const sequelize = require('./models/index').sequelize;

async function test() {
  try {
    const res = await getEmployeeTracking({ staffId: 12, date: '2026-06-22' });
    console.log('Result:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await sequelize.close();
  }
}

test();
