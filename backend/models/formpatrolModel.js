import {Sequelize} from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const FormPatrol = db.define('FormPatrol', {
  tanggal: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  lokasi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uraianTemuan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image1: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  image2: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  Url1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Url2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tindakLanjut: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('on progress', 'selesai'),
    defaultValue: 'on progress',
  },
},{
    freezeTableName:true
});
export default FormPatrol;

(async()=>{
    await db.sync();
})();