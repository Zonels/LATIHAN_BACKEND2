import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import mysql from "mysql2";

const dbname = process.env.DBNAME;
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const host = process.env.DBHOST;

const db = new Sequelize(dbname, username, password, {
  host: host,
  port: 25151,
  dialect: "mysql",
  dialectModule: mysql,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },

  define: {
    timestamps: false,
  },
});

export default db;





