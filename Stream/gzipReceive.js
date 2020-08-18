const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
    const filename = req.headers.filename;
    console.log("file request received: "+filename);
    req.pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(filename))
    .on('finish', () => {
        res.writeHead(201,{ 'Content-Type': 'text/plain'})
        res.end('that is it \n');
        console.log('file saved');
    })
})

server.listen(3000, () => console.log('server is on in port 3000'));