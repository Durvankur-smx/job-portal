const Job = require('../models/jobModel');

const isMissingRequiredFields = ({ title, company }) => !title || !company;

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.getAllJobs();

    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await Job.getJobById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    return next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    if (isMissingRequiredFields(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Title and company are required'
      });
    }

    const job = await Job.createJob(req.body);

    return res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    return next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    if (isMissingRequiredFields(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Title and company are required'
      });
    }

    const job = await Job.updateJob(req.params.id, req.body);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    return next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const deleted = await Job.deleteJob(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};
