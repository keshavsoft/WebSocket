// let CommonForWebSocketStart = require("./Projects/KWSServer/EntryFile");
// let CommonJsonApi = require("./Projects/JsonApi/Routes");
// import { JSONPreset } from 'lowdb/node'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// const JSONPreset = await import('lowdb/node');
import JSONPreset from 'lowdb/node'

// import { express } from 'express'
console.log("JSONPreset : ", JSONPreset);
const express = require('express');
const http = require('http');
const app = express();
var path = require('path');
const server = http.createServer(app);
app.use(express.json());

var port = normalizePort(process.env.PORT || '3000');

// app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.end("home called")
});
// app.use('/Routes', CommonJsonApi)

app.post('/Csv', (req, res) => {

    let LocalBodyData = req.body;

    console.log("req:", LocalBodyData);
    res.json(LocalBodyData)

});

app.get('/Lowdb', (req, res) => {

    LocalLowdbFunc().then(() => {

        res.end("Lowdb");
    });
});


let LocalLowdbFunc = async () => {
    // Read or create db.json
    const defaultData = { posts: [] }
    const db = await JSONPreset.JSONFile('db.json', defaultData)

    // Create and query items using plain JavaScript
    db.data.posts.push('hello world')
    const firstPost = db.data.posts[0]

    // If you don't want to type db.data everytime, you can use destructuring assignment
    const { posts } = db.data
    posts.push('hello world')

    // Finally write db.data content to file
    await db.write()
};


//app.use("/JSONApi", cors({ origin: '*' }), SubRouteJSONProject);
// CommonForWebSocketStart(server);

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
