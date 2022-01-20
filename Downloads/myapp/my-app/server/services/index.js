const { commitTransaction } = require("../mysqlconnection/db");
const db = require("../mysqlconnection/db");

class Services {
    
    static async addUser(payload){
        console.log('-----payload----',payload);
        let connection;
        return new Promise((resolve, reject)=>{
            db.getConnection().then(conn=>{
                connection = conn;
                return db.beginTransaction(connection); 
            }).then(()=>{
                return new Promise((resUser, rejUser)=>{
                    let sql = connection.query(`Select * from register where email='${payload.email}'`, async (err, result)=>{
                       console.log('---select sql----', sql)
                        if(err){
                            await db.rollbackTransaction(connection);
                             db.releaseConnetion(connection);
                            //  console.log('----rejUser-----', err)
                             reject(err);
                        }
                        else{
                            await db.commitTransaction(connection);
                            db.releaseConnetion(connection);
                            if(result && result.length>0)
                            {
                                console.log('----result----', result)
                                resolve("Email already exist");
                            }
                            else{
                                console.log('----Record not found----', result);
                                resUser('NewEntry');
                            }     
                        }
                        
                    })
                })
            })
            .then((data)=>{
                console.log('---data value--', data)
                return new Promise((res, rej)=>{
                 if(data=='NewEntry')
                 {
                    let sql = connection.query(`INSERT INTO register(firstName, lastName, email, password, phone, address, gender)values(?,?,?,?,?,?,?)`, [payload.firstName, payload.lastName, payload.email, payload.password, payload.phone, payload.address, payload.gender], async (err, results)=>{
                 //    console.log('--insert query---',sql)
                        if(err)
                        {
                           await db.rollbackTransaction(connection);
                            db.releaseConnetion(connection);
                            console.log('--err--', err);
                            rej(err);
                        }
                        else
                        {
                            await db.commitTransaction(connection);
                            db.releaseConnetion(connection);
                           // console.log("---data inserted successfully---", results);
                            if(results.affectedRows>0)
                            {
                                console.log(results.affectedRows, 'row affected');
                                res('SUCCESS');
                            }
                            else{
                                console.log('0 row affected');
                                res("UN-SUCCESS");
                            }
                        }
                    })
                 } })
            }).then(()=>{
                resolve("DATA INSERTED");
            }).catch(err=>{
                reject(err);
            })
          
         })
    };

//Get all Users details

static async getAllUsersDetails()
{
    let connection;
    return new Promise((resolve, reject)=>{
        db.getConnection().then((con)=>{
            connection = con;
            return db.beginTransaction(connection);

        }).then(()=>{
            return new Promise((res, rej)=>{
                let sql = connection.query(`Select * from register`, async(err, result)=>{
                    
                    if(err){
                        await db.rollbackTransaction(connection);
                        db.releaseConnetion(connection);
                        console.log('Error Occured..!!');
                        rej(err)
                    }
                    else
                    {
                        await db.commitTransaction(connection);
                        db.releaseConnetion(connection);
                        console.log('All users details----',result);
                        resolve(result);
                    }
                })
            })
        })
        
    })
    .catch(err=>{
        console.log(err);
        reject(err);
    })
}


   // Get User detail by email id

 static async getUserDetailByEmail(email){

    console.log('-----email----');
    let connection;
    return new Promise((resolve, reject)=>{
        db.getConnection().then(conn=>{
            connection = conn;
            return db.beginTransaction(connection);
        }).then(()=>{
            return new Promise((resUser, rejUser)=>{
                let sql = connection.query(`Select * from register where email='${email}'`, async(err, result)=>{
                   console.log('---select sql----', sql)
                    if(err){
                        await db.rollbackTransaction(connection);
                         db.releaseConnetion(connection);
                        //  console.log('----rejUser-----', err)
                         reject(err);
                    }
                    else{
                        await db.commitTransaction(connection);
                        db.releaseConnetion(connection);
                        if(result && result.length>0)
                        {
                            console.log('----result----', result)
                            resolve(result);
                        }
                        else{
                            console.log('----Record not found----', result);
                            resolve([]);
                        }     
                    }
                    
                })
            })
        })
        .catch(error=>{reject(error)})
    })
}

}
module.exports = Services;