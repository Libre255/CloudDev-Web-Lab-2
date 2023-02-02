const express = require('express');
const cors = require('cors');

let app = express();
const serverPORT = 8080;

app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server/index.js')));

app.get('/',(req, res) => {
    res.json({msg:"Welcom to my server"});
})

app.listen(serverPORT, ()=>{
    console.log({msg:"Server has been initialized"});
})