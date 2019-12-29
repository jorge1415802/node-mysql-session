var mysql = require('mysql');
var {promisify} = require('util');
const { database } = require('./keys');
const conexion = mysql.createConnection(database);
const pool = mysql.createPool(database);

pool.getConnection((err,connection) => {
  if(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      console.error('La conexion con la base de datos se perdio');
    }
    if(err.code === 'ER_CON_COUNT_ERROR'){
      console.error('La base de datos tiene demasiadas conexiones');
    }
    if(err.code === 'ECONNREFUSED'){
      console.error('La conexion a la base de datos fue rechazada');
    }
  }

  if(connection) connection.release();
  console.log('Conectado a la base de datos');
});

pool.query = promisify(pool.query)
module.exports = pool;
