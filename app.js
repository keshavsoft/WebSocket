let CommonForWebSocketStart = require("./Projects/KWSServer/EntryFile");

const express = require('express');
const http = require('http');
const app = express();
var path = require('path');
const server = http.createServer(app);

var port = normalizePort(process.env.PORT || '3000');

app.use('/', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.end("home called")
});

//app.use("/JSONApi", cors({ origin: '*' }), SubRouteJSONProject);
CommonForWebSocketStart(server);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

server.listen(port, () => {
    console.log("localhost running at port : 3000");
    console.log("http://localhost:3000");
});
