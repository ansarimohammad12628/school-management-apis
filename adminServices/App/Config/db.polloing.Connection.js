const mysql = require("mysql2/promise");
const  logger  = require("./logger.config");
const config = require("./db.conf");

const pool = mysql.createPool(config.mysql)


pool
.getConnection()
.then((conn)=>{
    console.log("DB CONNECTED");
    conn.release();
})
.catch((err)=> {
    console.error("DB CONNECTED FAILED", err);
   
});

let activeConnection = 0;

pool.on("acquire",function(connection){
    activeConnection++;
    logger.info(
        `Connection ${connection.threadId} acquired. Active connection: ${activeConnection}`,
    );
})
pool.on("release",function(connection){
    activeConnection--;
    logger.info(
        `Connection ${connection.threadId} released. Active connection: ${activeConnection}`,
    );
})

module.exports = pool