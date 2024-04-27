const express = require('express');
const router = express.Router();
const fs = require('fs');
const rootPath = require('../util/path')
const path = require('path');

router.post('/abc', (req, res) => {
    const chatRec = req.body.chat;
    const login = req.body.loginname;
    fs.appendFile('chat.txt', `${login}:${chatRec} `, (err) => {
        if (err) {
            console.error(err);
        }
        else {
            res.redirect('/');
        }
    });

})

router.get('/', (req, res) => {
    fs.readFile(path.join(rootPath, ".", "chat.txt"), (err, data) => {
        if (err) {
            data="";
        }
        else {
            res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <header>
        <nav>
            <a href="/user">Login Page</a>
            <a href="/chat">Chat Page</a>
        </nav>
    </header>
    <p id="para">${data}</p>
    <form action="/abc" method="post">
        <input type="text" name="chat">
        <input type="hidden" name="loginname" id="loginnameid">
        <button type="submit">Send</button>
        
    </form>
    <script>
        document.getElementById('loginnameid').value = localStorage.getItem('uname');
    </script>
</body>
</html>
    `)
        }
    });

})

router.post('/', (req, res) => {
    const data = req.body.username;
    fs.readFile("chat.txt",(err,dataToDisplay)=>{
        if(err){
            dataToDisplay=" ";
        }
        else{
            res.send(`${dataToDisplay}
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <header>
        <nav>
            <a href="/user">Login Page</a>
            <a href="/chat">Chat Page</a>
        </nav>
    </header>
    <form action="/abc" method="post">
        <input type="text" name="chat">
        <input type="hidden" name="loginname" value="${data}">
        <button type="submit">Send</button>
    </form>
    <script>
        localStorage.setItem("uname","${data}")
    </script>
</body>
</html>
    `)
        }
    })
    
})

module.exports = router;