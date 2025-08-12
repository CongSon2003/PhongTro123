const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("phongtro123", "root", null, {
    host: "localhost",
    dialect: "mysql",
    logging: false
});                                                                                                                             
const connectionDataBase = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Connection has been established seccessfully ✅");
    } catch (error) {
        console.log("Untale to connect to the database 📴");
    }
}    
connectionDataBase()