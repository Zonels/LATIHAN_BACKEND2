import { Sequelize } from "sequelize";
import mysql from "mysql2";
const dbname= process.env.DBNAME;
const username= process.env.USERNAME;
const password= process.env.PASSWORD;
const host= process.env.host;

const db = new Sequelize(dbname, username , password, {
  host: host,
  dialect: "mysql",
  dialectModule: mysql,
  port: 25151,
  dialectOptions: { ssl: { rejectUnauthorized: false } },
  define: { timestamps: false },
});
export default db;

(async () =>{
    await db.sync();
})();



