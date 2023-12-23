
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

import { JSONPreset } from 'lowdb/node'
// let JSONPreset = require("lowdb");


let StartFunc = async () => {

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

// StartFunc().then();

export { StartFunc };