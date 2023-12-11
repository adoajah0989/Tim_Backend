import { Sequelize } from "sequelize";
 
const db = new Sequelize('nurman', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;