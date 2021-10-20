module.exports.dbSchema = `
  CREATE TABLE IF NOT EXISTS status (
    id integer NOT NULL PRIMARY KEY,
    description VARCHAR(100) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS devices (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    identification VARCHAR(100) NOT NULL, 
    serialnumber VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    lot VARCHAR(100) NOT NULL,
    manufacturing_date TEXT NOT NULL,
    register VARCHAR(100) NOT NULL,
    status_id integer NOT NULL,
    FOREIGN KEY (status_id) REFERENCES status(id)
  );
  CREATE TABLE IF NOT EXISTS data (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    device_id integer NOT NULL ,
    pac_press integer NOT NULL ,
    pac_flow integer NOT NULL,
    pne_press integer NOT NULL ,
    ins_time integer NOT NULL ,
    exp_time integer NOT NULL ,
    rel_ie integer NOT NULL,
    respFreq integer NOT NULL,    
    FOREIGN KEY (device_id) REFERENCES devices(id)
  );
  CREATE TABLE IF NOT EXISTS calibration_data (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    device_id integer NOT NULL ,
    pressure integer NOT NULL,
    flow integer NOT NULL ,
    FOREIGN KEY (device_id) REFERENCES devices(id)
  );`;
