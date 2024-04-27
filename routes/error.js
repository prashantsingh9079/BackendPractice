const express = require('express');
const rootPath = require('../util/path')
const path = require('path');
const router = express.Router();

router.use('/',(req,res)=>{
    res.sendFile(path.join(rootPath,".","views","error.html"))
})

module.exports = router;