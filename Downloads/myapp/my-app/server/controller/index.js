const { dblClick } = require('@testing-library/user-event/dist/click');
const Service = require('../services/index')

class Controller{

    static async addUser(req, res){
        const {firstName, lastName, email, password,phone, address, gender} = req.body;
       // console.log(req.body)
        let data ={
            firstName: firstName,
            lastName :lastName,
            email:email,
            password:password,
            phone:phone,
            address:address,
            gender:gender
        }
        Service.addUser(data).then(result=>{
      // console.log(result);
        res.status(200).send(result);
        }).catch(err=>{ res.status(400).send(err);})
         console.log('--controller--addUser----');
    }

    //Get all Users details 
    static getAllUsersDetails(req, res)
    {
        Service.getAllUsersDetails().then(result=>{
            console.log('----All users Details get successfully---', result);
            res.status(200).send(result);
        })
       
    }

    //Get the user details by email id
    static getUserDetailByEmail(req, res)
    {
        const email = req.query.email;
        console.log(email,'---email--');
    Service.getUserByEmail(email).then((result)=>{
        res.status(200).send(result)
    }).catch(err=>{res.status(400).send(err)});
    }
}
module.exports = Controller;