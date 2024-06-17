const {
    Sequelize
} = require('sequelize');
const db = require("../configs/connection");
const {
    DataTypes
} = Sequelize;
const User = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    user_name: DataTypes.STRING(100),
    user_username: DataTypes.STRING(100),
    user_password: DataTypes.TEXT,
    user_status: DataTypes.INTEGER(1),
}, {
    freezeTableName: true
});

module.exports = {
    User
};
(async () => {
    await db.sync();
    
})();