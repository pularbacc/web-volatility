const WebSocket = require('ws');
const tokenModule = require('../modules/token');
const db = require('../database/db');


let clients = []
let vol = null

const run = () => {
    const server = new WebSocket.Server({ 
        port: process.env.PORT_SERVER_SOCKET
     });
    server.on('connection', async (socket) => {
        try {
            console.log("---> on connection ");
            send_mess_socket(socket, {
                action: "STATUS_CONNECT",
                data: {
                    messages: "success"
                }
            });

            socket.on('message', async (msg) => {
                msg = msg.toString();
                const data = JSON.parse(msg);
                process_mess(socket, data);
            });
        } catch (e) {
            console.log(e);
        }
    });
}

// handle process when clients request socket
const process_mess = async (soc, data) => {
    try {
        switch (data.action) {
            case "INIT_CLIENT":
                await init_client(soc, data);
                break;
            case "INIT_VOL":
                await init_vol(soc, data);
                break;
            case "RUN_COMMAND":
                await run_command(soc, data);
                break;
            case "RESULT_COMMAND":
                await result_command(soc, data);
                break;
        }
    } catch (e) {
        console.log(e);
    }
}

const init_client= async (soc, data) => {
    clients.push(soc);
    send_mess_socket(soc, {
        action: "STATUS_SOCKET",
        data: {
            messages: "success"
        }
    });
    soc.on("close", () => {
        try {
            const idx = clients.findIndex(item => item == soc);

            if (idx >= 0) {
                clients.splice(idx, 1);
            }
        } catch (e) {
            console.log(e);
        }
    });
}

const init_vol= async (soc, data) => {
    vol = soc;
    send_mess_socket(soc, {
        action: "STATUS_SOCKET",
        data: {
            messages: "success"
        }
    });
    soc.on("close", () => {
        vol = null;
    });
}

const run_command = async (soc, data) => {
    send_mess_socket(vol, data);
}

const result_command = async (soc, data) => {
    for(const client of clients){
        send_mess_socket(client, data);
    }
}

//Send message to socket client
const send_mess_socket = (soc, mess) => {
    try{
        soc.send(JSON.stringify(mess));
    }catch(e){
        console.log(e);
    }
}

setInterval(() => {
    try{
        if(vol){
            send_mess_socket(soc, {
                action: "PIN"
            })
        } 
        for(const soc of clients){
            send_mess_socket(soc, {
                action: "PIN"
            })
        }
    }catch(e){
        console.log(e);
    }
  }, 20000);

module.exports = {
    run: run,
};