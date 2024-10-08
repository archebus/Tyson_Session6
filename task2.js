const fs = require('node:fs');
const file = process.argv[2];
const term = process.argv[3];

fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    let lines = data.split('\n');
    let lineCount = 1;
    let found = false;

    lines.forEach(line => {
        let startIndex = line.indexOf(term);
        while (startIndex !== -1) {
            console.log(`'${term}' found ${lineCount}:${startIndex + 1}`);
            found = true;
            startIndex = line.indexOf(term, startIndex + term.length);
        }
        
        lineCount++;
    });

    if (!found) {
        console.log(`'${term}' not found in file.`)
    }
})