require('dotenv').config();
const mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro na conexão:', err);
    return;
  }
  console.log('Conexão MySQL bem-sucedida.');
  connection.release();
});

const query = (sql, args) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, args, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { query };