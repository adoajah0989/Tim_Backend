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
  Url_Bukti1: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  Url_Bukti2: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
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