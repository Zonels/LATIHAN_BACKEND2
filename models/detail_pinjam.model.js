import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;
const DetailPinjam = db.define(
  "detail_pinjams",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pinjam_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Pinjams",
        key: "id",
      },
    },
    buku_id: {
      type: DataTypes.INTEGER,

    },
    jml_pinjam: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  },
);

export default DetailPinjam;