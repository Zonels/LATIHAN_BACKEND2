import { Sequelize } from "sequelize";
import mysql from "mysql2";
const dbname= process.env.DBNAME;
const username= process.env.DBUSERNAME;
const password= process.env.DBPASSWORD;
const host= process.env.DBhost;

console.log(dbname)

const db = new Sequelize(`mysql://${username}:${password}@${host}:25151/web_lanjut`,{
  host: host,
  dialect: "mysql",
  dialectModule: mysql,
  define: { timestamps: false },
});
export default db;

// (async () =>{
//     await db.sync();
// })();



