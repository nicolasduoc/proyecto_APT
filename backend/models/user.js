const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  }
});

module.exports = User;
