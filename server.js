const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/andotest-fronted'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/andotest-fronted/index.html'));
});

app.listen(process.env.PORT || 8080);