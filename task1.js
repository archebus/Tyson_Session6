const fs = require('node:fs');
const file = process.argv[2];

fs.readFile(file, 'utf-8', (err, data) => {
    let words = data.split(' ').length;
    let lines = data.split('\n').length;
    let chars = data.split('').length;

    console.log(`${words} ${chars} ${lines}`);
});