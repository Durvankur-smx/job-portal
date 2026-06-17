const Job = require('../models/jobModel');

const renderHomePage = async (req, res, next) => {
  try {
    const jobs = await Job.getAllJobs();

    res.render('index', {
      title: 'Job Portal',
      jobs: jobs.slice(0, 3)
    });
  } catch (error) {
    next(error);
  }
};

const renderJobsPage = async (req, res, next) => {
  try {
    const jobs = await Job.getAllJobs();

    res.render('jobs', {
      title: 'Available Jobs',
      jobs,
      success: req.query.success
    });
  } catch (error) {
    next(error);
  }
};

const renderAddJobPage = (req, res) => {
  res.render('addJob', {
    title: 'Add Job',
    error: null,
    formData: {}
  });
};

const addJob = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).render('addJob', {
        title: 'Add Job',
        error: 'Title and description are required.',
        formData: req.body
      });
    }

    await Job.createJob({
      title,
      description,
      company: 'Not specified',
      location: null,
      salary: null
    });

    return res.redirect('/jobs?success=Job%20added%20successfully');
  } catch (error) {
    return next(error);
  }
};

const renderJobDetailsPage = async (req, res, next) => {
  try {
    const job = await Job.getJobById(req.params.id);

    if (!job) {
      return res.status(404).render('pages/error', {
        title: 'Job Not Found',
        message: 'The job you are looking for does not exist.'
      });
    }

    return res.render('jobDetails', {
      title: job.title,
      job,
      createdDate: job.created_at
        ? new Date(job.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : 'Not available'
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  renderHomePage,
  renderJobsPage,
  renderAddJobPage,
  addJob,
  renderJobDetailsPage
};
