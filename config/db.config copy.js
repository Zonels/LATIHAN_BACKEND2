import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
const db = new Sequelize("web_lanjut", "avnadmin", "AVNS_rgEcguDBcGfPZcZ1iWf", {
  host: "mysql-293598b2-jonokademangan-9655.a.aivencloud.com",
  dialect: "mysql",
  port: 13323,
  dialectOptions: { ssl: { rejectUnauthorized: false } },
  define: { timestamps: false },
});
export default db; /*(async()=>{ await db.sync({ alter: true }); })();*/
