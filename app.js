const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const errorRoute = require('./routes/error')

app.use(bodyParser.urlencoded({extended:false}));

app.use(userRoute);

app.use(chatRoute);

app.use(errorRoute);

app.listen(4000);