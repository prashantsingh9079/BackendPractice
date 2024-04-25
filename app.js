const http = require('http');

const server = http.createServer((req,res)=>{
    // console.log("req");
    const url = req.url;
    if(url=='/home'){
        res.setHeader("Content-Type","text/html")
        res.write('<h1>home</h1>');
        return res.end()
    }
    else if(url=='/admin'){
        res.setHeader("Content-Type","text/html")
        res.write('<h1>admin</h1>');
        return res.end()
    }
})

server.listen(3000);