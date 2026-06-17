const db = require('../config/db');

exports.findAll = async () => {
  const [rows] = await db.query(`
    SELECT applications.*, jobs.title AS job_title
    FROM applications
    LEFT JOIN jobs ON applications.job_id = jobs.id
    ORDER BY applications.created_at DESC
  `);
  return rows;
};

exports.create = async ({ job_id, applicant_name, applicant_email, resume_link }) => {
  const [result] = await db.query(
    'INSERT INTO applications (job_id, applicant_name, applicant_email, resume_link) VALUES (?, ?, ?, ?)',
    [job_id, applicant_name, applicant_email, resume_link]
  );
  return result.insertId;
};
