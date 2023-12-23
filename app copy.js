import express from 'express';
import { JSONPreset } from 'lowdb/node'

const app = express();

var port = normalizePort(process.env.PORT || '3000');

app.get('/', (req, res) => {
    res.end("home called")
});

app.get('/Lowdb', (req, res) => {

    LocalLowdbFunc().then(() => {

        res.end("Lowdb");
    });
});

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

let LocalLowdbFunc = async () => {
    // Read or create db.json
    const defaultData = { posts: [] }
    const db = await JSONPreset('db.json', defaultData)

    // Create and query items using plain JavaScript
    db.data.posts.push('hello world')
    const firstPost = db.data.posts[0]

    // If you don't want to type db.data everytime, you can use destructuring assignment
    const { posts } = db.data
    posts.push('hello world')

    // Finally write db.data content to file
    await db.write()
};

app.listen(port, () =>
    console.log('Example app listening on port 3000!'),
);