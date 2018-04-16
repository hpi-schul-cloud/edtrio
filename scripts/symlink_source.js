const fs   = require('fs');
const path = require('path');

const editor_path = path.join(__dirname, './../node_modules/edtrio');
const source_path = path.join(__dirname, './../src');

fs.symlink(source_path, editor_path, 'dir', (err, res) => {
    if(err) {
        console.error('Could not create symlink');
        process.exit(1);
    } else {
        console.log('Linked editor');
        process.exit(0);
    }
});