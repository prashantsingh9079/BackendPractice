const http = require('http');
const fs = require('fs');
const data = [];

const server = http.createServer((req, res) => {
    // console.log("req");
    const url = req.url;
    const method = req.method;
    if (url == '/home') {
        res.setHeader("Content-Type", "text/html")
        res.write('<h1>home</h1>');
        return res.end()
    }
    else if (url == '/form') {
        res.setHeader("Content-Type", "text/html").write(`<html><p>${data}</p><form action="/show" method="POST"> <input type="text" name="entered"><button type="submit">Click</button></form></html>`);
        res.end()
        
    }
    else if (url == '/show' && method == 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split("=")[1]);
            data.push(parsedBody.split("=")[1]);
            fs.writeFile("abc.txt", parsedBody, (err) => {
                if (err) {
                    console.error(err);
                }
                res.statusCode=302;
                res.setHeader("Location", "/form")
                res.end();
                // res.write('<h1>see logs</h1>');
            })
        })

    }
    else if (url == '/admin') {
        res.setHeader("Content-Type", "text/html")
        res.write('<h1>admin</h1>');
        return res.end()
    }
})

server.listen(5000);