const path = require("path");
const express = require('express');
const app = express();

//console.log(__dirname);
//console.log(path.join(__dirname,"../public"));

const staticPath =  path.join(__dirname,"../public");
app.use(express.static(staticPath));

app.get("/", (req, res)=>{
    res.send("Hello world from the express")
});

app.get('/about', (req,res)=>{
    res.send('Hello  world from the about page.');
})
app.listen(8000, ()=>{
    console.log("Listening the port at 8000");
})