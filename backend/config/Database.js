import { Sequelize } from "sequelize";
 
const db = new Sequelize('guard_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;