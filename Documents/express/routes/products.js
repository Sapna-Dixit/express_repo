var express = require("express");

var router = express.Router();

router.use("/", (req, res)=>{
    res.send("Get requests for Products.!!");
});

router.use("/get-product-details", (req,res)=>{
    res.send("Get requests for products details.");
});

module.exports = router;