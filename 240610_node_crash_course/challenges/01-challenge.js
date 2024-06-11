const fs = require('fs');

// repository :: https://github.com/andrewjmead/node-course-v3-code.git
// https://nodejs.org/docs/latest/api/fs.html#fswritefilesyncfile-data-options
fs.writeFileSync('./notes.txt', 'This file was created by Node.js');

// Challenge: Append message to notes.txt
fs.appendFileSync('./notes.txt', '\nAdditional Text');
