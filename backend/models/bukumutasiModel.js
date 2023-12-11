import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const BMutasi = db.define('bmutasi',{
    tanggal:{
        type: DataTypes.STRING
    },
    Shift:{
        type: DataTypes.STRING
    },
    Anggota:{
        type: DataTypes.STRING
    },
    Uraian_Kegiatan:{
        type: DataTypes.STRING
    },
    Danru_A:{
        type: DataTypes.STRING
    },
    Danru_B:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default BMutasi;