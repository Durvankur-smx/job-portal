const db = require('../config/db');

const getAllJobs = async () => {
  const [rows] = await db.query(
    'SELECT id, title, company, location, salary, description, created_at FROM jobs ORDER BY id DESC'
  );

  return rows;
};

const getJobById = async (id) => {
  const [rows] = await db.query(
    'SELECT id, title, company, location, salary, description, created_at FROM jobs WHERE id = ?',
    [id]
  );

  return rows[0];
};

const createJob = async ({ title, company, location, salary, description }) => {
  const [result] = await db.query(
    'INSERT INTO jobs (title, company, location, salary, description) VALUES (?, ?, ?, ?, ?)',
    [title, company, location, salary, description]
  );

  return {
    id: result.insertId,
    title,
    company,
    location,
    salary,
    description
  };
};

const updateJob = async (id, { title, company, location, salary, description }) => {
  const [result] = await db.query(
    `
      UPDATE jobs
      SET title = ?, company = ?, location = ?, salary = ?, description = ?
      WHERE id = ?
    `,
    [title, company, location, salary, description, id]
  );

  if (!result.affectedRows) {
    return null;
  }

  return {
    id: Number(id),
    title,
    company,
    location,
    salary,
    description
  };
};

const deleteJob = async (id) => {
  const [result] = await db.query('DELETE FROM jobs WHERE id = ?', [id]);

  return result.affectedRows > 0;
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};
