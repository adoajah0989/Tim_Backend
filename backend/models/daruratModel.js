import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Darurat = db.define('darurat', {
  lokasi: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  no_damkar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  no_polsek: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  no_babinKab: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  no_babinsa: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  no_instansi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  no_pimpinan: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  no_kodalops: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  no_it: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  freezeTableName: true
});

 
(async () => {
    await db.sync();
})();

export default Darurat;
