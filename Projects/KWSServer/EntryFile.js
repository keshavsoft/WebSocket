const WebSocket = require('ws');
let wss;

let StartFunc = (server) => {
    wss = new WebSocket.Server({ server });

    wss.on("connection", WsOnConnection);
};

let WsOnConnection = (ws, req) => {
    ws.on('message', (data, isBinary) => {
        console.log("rec messages : ", data.toString());
        ws.send("received");
    });

    ws.on('close', () => {
        console.log('closed');
    });

    ws.send(Date.now());
};

module.exports = StartFunc;