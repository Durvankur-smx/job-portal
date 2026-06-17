const db = require('../config/db');

const getAllApplications = async (req, res, next) => {
  try {
    const [applications] = await db.query(`
      SELECT
        applications.id,
        applications.user_id,
        applications.job_id,
        applications.status,
        applications.created_at,
        users.name AS applicant_name,
        users.email AS applicant_email,
        jobs.title AS job_title
      FROM applications
      LEFT JOIN users ON applications.user_id = users.id
      LEFT JOIN jobs ON applications.job_id = jobs.id
      ORDER BY applications.id DESC
    `);

    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const [applications] = await db.query(
      `
        SELECT
          applications.id,
          applications.user_id,
          applications.job_id,
          applications.status,
          applications.created_at,
          users.name AS applicant_name,
          users.email AS applicant_email,
          jobs.title AS job_title
        FROM applications
        LEFT JOIN users ON applications.user_id = users.id
        LEFT JOIN jobs ON applications.job_id = jobs.id
        WHERE applications.id = ?
      `,
      [req.params.id]
    );

    if (!applications.length) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: applications[0]
    });
  } catch (error) {
    return next(error);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const { user_id, job_id, status = 'submitted' } = req.body;
    const [result] = await db.query(
      'INSERT INTO applications (user_id, job_id, status) VALUES (?, ?, ?)',
      [user_id, job_id, status]
    );

    res.status(201).json({
      success: true,
      message: 'Application created successfully',
      data: {
        id: result.insertId,
        user_id,
        job_id,
        status
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication
};
