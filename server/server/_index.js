const http = require('http');
const SERVER_REQ = require('./req');
const SERVER_RES = require('./res');
const SERVER_CONTROLLER = require('./controller');
const DB = require('../database/db');

module.exports = () => {
    // create http server
    const SERVER = http.createServer(async (_req, _res) => {
        try {
            // parse client request
            const req = await SERVER_REQ(_req);

            // modules for send respon
            const res = SERVER_RES(_res);

            // if method = OPTIONS => accept
            if (req.method == "OPTIONS") {
                res.ok();
                return;
            }

            try {
                // controller request
                SERVER_CONTROLLER(req, res, DB);
            } catch (error) {
                res.error(400, "Bad request");
            }
        } catch (error) {
            console.log(error);
        }
    });
    SERVER.listen(process.env.PORT_SERVER, '0.0.0.0');

    // SERVER.on("upgrade", (request, socket, head) => {
    //     wsServer.handleUpgrade(request, socket, head, (socket) => {
    //         wsServer.emit("connection", socket, request);
    //     });
    // });
}