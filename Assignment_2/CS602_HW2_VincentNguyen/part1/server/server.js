const net = require('net');

const colors = require('colors');

const cities = require('./zipCodeModule_v2');

const server = net.createServer((socket) => {
  console.log("Client connection...".red);

  socket.on('end', () => {
    console.log("Client disconnected...".red);
  });

  // Code to process data from client
  socket.on('data', (data) => {
    let input = data.toString();
    console.log(colors.blue('...Received %s'), input);
    // Trim white space and split string to get Array
    const inputArr = input.trim().split(',');
    let result;
    // Check if the input data contain the methods.
    if (input.includes('lookupByZipCode')) {
      result = cities.lookupByZipCode(inputArr[1]);
    } else if (input.includes('lookupByCityState')) {
      result = cities.lookupByCityState(inputArr[1], inputArr[2]);
    } else if (input.includes('getPopulationByState')) {
      result = cities.getPopulationByState(inputArr[1]);
    } else {
      result = 'Invalid request';
    }
    // Send data to client. if result is undefined, send undefined,
    // other that send result as string
    socket.write(result === undefined ? 'undefined' : JSON.stringify(result));
  });
});

// listen for client connections
server.listen(3000, () => {
  console.log('Listening for connections on port 3000');
});
