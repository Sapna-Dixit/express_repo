/**
 * E-Commerce Appliation
 * -Users
 * -Products
 * -Items
 * -Reviews
 * -Comments
 * -Images
 * -Videos
 * -Return
 * -other
 * 
 * CRUD - Operations
 */

//CRUD - USER

var express = require("express");
var products = require("/routes/products");
var users    = require('/routes/users');
var app = express();

app.use('/products', products);
app.use('/users', users);

app.delete("/delete-user", (req, res)=>{
    res.send("delete User");
});

//CRUD -Products
app.post("/create-products", (req,res)=>{
    res.send("create users");
});
app.put("/update-products", (req,res)=>{
    res.send("update user");
})
app.get("/read-all-products", (req, res)=>{
    
    res.send("List of Products");
   
});

app.get("/get-products-details", (req,res)=>{
    const userObj = {
        id :1,
        name : "Ramlal",
        lastName : "Sharma",
        status : true
    }
    res.send(userObj);
})

app.delete("/delete-products", (req, res)=>{
    res.send("delete Products");
})
app.listen(4000);