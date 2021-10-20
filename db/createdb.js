require('dotenv').config();
const { DatabaseAPI } = require('./database.js');
const dbMeta = require('./schema.js');

const DB = new DatabaseAPI(process.env.DATABASE, dbMeta.dbSchema);

async function populateDB() {
  try {
    let result = null;
    result = await DB.createStatus({ id: -1, description: 'retired' });
    //  console.log(result);
    result = await DB.createStatus({ id: 0, description: 'inactive' });
    //  console.log(result);
    result = await DB.createStatus({ id: 1, description: 'active' });
    //  console.log(result);
    result = await DB.createDevice(
      'id1',
      'sn1',
      'brand1',
      'model1',
      'lot1',
      '2020-01-21 12:00:00.000',
      'register1',
      1
    );
    //  console.log(result);
    result = await DB.createDevice(
      'id2',
      'sn2',
      'brand2',
      'model2',
      'lot2',
      '2020-03-22 12:00:00.000',
      'register2',
      1
    );
    //  console.log(result);
    result = await DB.createCalibrationData(1, 10, 20);
    //  console.log(result);
    result = await DB.createCalibrationData(2, 20, 30);
    //  console.log(result);
    result = await DB.findDeviceById(1);
    //  console.log(result);
    result = await DB.getDevicesAll();
    console.log(result);
  } catch (error) {
    console.log('error:', error);
  }
}

populateDB();
