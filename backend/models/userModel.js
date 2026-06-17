const db = require('../config/db');

exports.findAll = async () => {
  const [rows] = await db.query('SELECT id, name, email, role FROM users ORDER BY id DESC');
  return rows;
};
