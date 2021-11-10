var express = require("express");

var router  = express.Router();

router.get("/", (req, res)=>{
    res.send("Get Requests for users.!!")
});

router.get("/user-details/:id", (req,res)=>{
    res.send("Get Request for specific users!!!"+req.params.id);
});

router.post("/create-user", (req,res)=>{
    res.send("create users");
});
router.put("/update-user", (req,res)=>{
    res.send("update user");
})
router.get("/read-all-users", (req, res)=>{
    
    res.send("List of Users");
   
});

router.get("/get-details", (req,res)=>{
    const userObj = {
        id :1,
        name : "Ramlal",
        lastName : "Sharma",
        status : true
    }
    res.send(userObj);
});



module.exports = router;