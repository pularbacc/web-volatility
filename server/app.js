const server = require('./server/_index')
const socket = require('./socket/index')

//Config ENV
require('dotenv').config()

//Run server http
server();

//Run server socket
socket.run();







