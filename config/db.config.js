import { Sequelize } from "sequelize";
import mysql from "mysql2";
const db = new Sequelize("web_lanjut", "avnadmin", "AVNS_snLs5suqA5X2bEuut2-", {
  host: "mysql-1c2b2c05-latihan.h.aivencloud.com",
  dialect: "mysql",
  port: 25151,
  dialectOptions: { ssl: { rejectUnauthorized: false } },
  define: { timestamps: false },
});
export default db;

(async () =>{
    await db.sync();
})();



