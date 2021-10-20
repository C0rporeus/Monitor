const sqlite3 = require('sqlite3').verbose();

function DatabaseAPI(dbPath, dbSchema) {
  const DB = new sqlite3.Database(dbPath, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Connected to ${dbPath} database.`);
    //  enable foreign keys.

    //  Note: if you are testing databse with editor this command need to run manually before to insert records

    DB.exec('PRAGMA foreign_keys = ON;', function (error) {
      if (error) {
        console.error("Pragma statement didn't work.");
      } else {
        console.log('Foreign Key Enforcement is on.');
      }
    });
  });

  DB.exec(dbSchema, function (error) {
    if (error) {
      console.log(error);
    }
  });

  return {
    createStatus(status) {
      const { id, description } = status;
      return new Promise((resolve, reject) => {
        const sql = `INSERT INTO status (id, description) 
          VALUES (?, ?)`;

        DB.run(sql, [id, description], function (error) {
          if (error) {
            reject(error);
          } else {
            console.log(`Last ID: ${this.lastID}`);
            console.log(`# of Row Changes: ${this.changes}`);
            resolve(this.lastID);
          }
        });
      });
    },
    createData(data) {
      const { deviceId, pacPress, pacFlow, pnePress, insTime, expTime, relIe, respFreq } = data;

      return new Promise((resolve, reject) => {
        const sql = `INSERT INTO data (
          device_id,
          pac_press,
          pac_flow,
          pne_press,
          ins_time,
          exp_time,
          rel_ie,
          respFreq) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        DB.run(
          sql,
          [deviceId, pacPress, pacFlow, pnePress, insTime, expTime, relIe, respFreq],
          function (error) {
            if (error) {
              reject(error);
            } else {
              console.log(`Last ID: ${this.lastID}`);
              console.log(`# of Row Changes: ${this.changes}`);
              resolve(this.lastID);
            }
          }
        );
      });
    },
    createDevice(
      identification,
      serialnumber,
      brand,
      model,
      lot,
      manufacturingDate,
      register,
      statusId
    ) {
      return new Promise((resolve, reject) => {
        const sql = `INSERT INTO devices (identification, serialnumber, brand, model, lot, manufacturing_date, register, status_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
        DB.run(
          sql,
          [identification, serialnumber, brand, model, lot, manufacturingDate, register, statusId],
          function (error) {
            if (error) {
              reject(error);
            } else {
              console.log(`Last ID: ${this.lastID}`);
              console.log(`# of Row Changes: ${this.changes}`);
              resolve(this.lastID);
            }
          }
        );
      });
    },
    createCalibrationData(deviceId, pressure, flow) {
      return new Promise((resolve, reject) => {
        const sql = `INSERT INTO calibration_data (device_id, pressure, flow) 
          VALUES (?, ?, ?)`;

        DB.run(sql, [deviceId, pressure, flow], function (error) {
          if (error) {
            reject(error);
          } else {
            console.log(`Last ID: ${this.lastID}`);
            console.log(`# of Row Changes: ${this.changes}`);
            resolve(this.lastID);
          }
        });
      });
    },
    findDeviceById(id) {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM devices WHERE id = ? ';

        DB.get(sql, id, function (error, row) {
          if (error) {
            reject(error);
          } else {
            resolve(row);
          }
        });
      });
    },
    getDevicesAll() {
      return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM devices';

        DB.all(sql, [], function (error, rows) {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        });
      });
    },
  };
}

module.exports = { DatabaseAPI };
