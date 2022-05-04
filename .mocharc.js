require('dotenv').config();

module.exports = {
    require: ['./tests/global.ts'],
    parallel: true,
    timeout: 30000,
   spec: ['./tests/**/patch.patient.test.ts']
}