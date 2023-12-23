
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express')
const app = express()
const { StartFunc } = import("./klowdb.mjs");

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/k1', function (req, res) {
    console.log("k1 : ", StartFunc);
    StartFunc().then();
    res.send('k1')
});

app.listen(3000)