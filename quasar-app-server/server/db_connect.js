const { Sequelize } = require('sequelize');
const { bd_nombre, bd_usuario, bd_clave, bd_puerto } = require('./config');

const db = new Sequelize(bd_nombre, bd_usuario, bd_clave, {
  host: 'localhost',
  port: bd_puerto,
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.authenticate()
  .then(() => console.log('Conectado a la BD'))
  .catch(err => console.log(err));

module.exports = db;