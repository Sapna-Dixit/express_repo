require('dotenv').config();
const mysql = require('mysql')

// const config={
//     db_url: process.env.DB_URL,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     db_connection_limit: process.env.DB_CONNECTION_LIMIT
// }
//console.log('-----config---', config);

console.log('**********************************************')

var pool  = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'user',
  });

class DB{

    static getConnection() {
        console.log('....getConnection invoked.....');
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                console.log("----pool getConnection----");
              if (err) { console.log(err); return reject(err); }
            //  console.log('----connection resolved----',connection);
              return resolve(connection);
            })
        });
      }
    
    //release the connection
    static releaseConnetion(connection){
        if(!DB.isReleased(connection)) {
            connection.release();
        }
    }

    //check connection released or not
    static isReleased(connection)
    {
        return pool._freeConnections.indexOf(connection)!== -1;
    }


    //save the changes  in the database permanently
    static commitTransaction(connection)
    {
        return new Promise((resolve, reject)=>{
            connection.commit((err)=>{
                if(err){return reject(err)}
            if(!DB.isReleased(connection)){connection.release()}
            return resolve();
            })
        })
    }

    //back to the previous state
    static rollbackTransaction(connection)
    {
        return new Promise((resolve, reject)=>{
            connection.rollback((err)=>{
                if(!DB.connection){connection.release()};
                if(err){ return reject(err)};
                return resolve();
            })
        })
    }

    //start the database Transaction
    static beginTransaction(connection)
    {
        return new Promise((resolve, reject)=>{
            try{
                 connection.beginTransaction(err=>{
                   if(err){ throw err;}
                   return resolve();
                 });
            }
            catch(err){
                if(!DB.isReleased(connection)){connection.release();}
                console.log(err);
                return reject(err);
            }
        })
    }

}
module.exports = DB;
