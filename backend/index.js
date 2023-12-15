const express = require ("express")
const app = express();
const port = 4000;

app.get("/",(req,res) =>{
    res.send ("hello world")
})

app.listen(port, () =>{
    console.log (`server is started on ${port}`)
})