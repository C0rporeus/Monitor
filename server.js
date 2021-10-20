require('dotenv').config();
const SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter');
const socket = require('socket.io');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const io = socket.listen(server);

io.on('connection', (client) => {
  console.log(`Connected medical user interface with socket ${client}`);
  /** Geting data for test */
  client.on('frontend:data', (data) => {
    console.log(data);
  });
});

function OpenSerialPort() {
  /** setup serial port */
  const localPort = new SerialPort(process.env.SERIAL_PORT, {
    baudRate: Number(process.env.BAUD_RATE),
    autoOpen: false,
  });
  localPort.open(function (err) {
    if (err) {
      let a = 0;
      /** Sending data for test every 20 ms */
      setInterval(function test() {
        a += 1;
        console.log(a);
        io.emit('arduino:data', { testValue: a });
      }, 20);
      console.log('Error opening port: ', err.message);
    }

    const parser = localPort.pipe(
      new Delimiter({
        delimiter: '\r\n',
      })
    );
    // events whit serialport
    localPort.on('open', (error) => {
      if (error) {
        console.log('Error on open: ', error.message);
      }
      console.log('Opened serial...');
    });
    parser.on('data', (data) => {
      const recieved = data.toString();
      const testValue = recieved.split(',');

      io.emit('arduino:data', { testValue });
      console.log(testValue.toString());
    });
  });
}

OpenSerialPort();

server.listen(process.env.PORT, () => {
  console.log(`Server is now running on port ${process.env.PORT}`);
});
