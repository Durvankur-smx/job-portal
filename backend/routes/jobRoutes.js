const express = require('express');
const jobController = require('../controllers/jobController');
const jobViewController = require('../controllers/jobViewController');

const router = express.Router();

router.get('/', jobViewController.renderJobsPage);
router.get('/add', jobViewController.renderAddJobPage);
router.post('/add', jobViewController.addJob);
router.get('/:id', jobViewController.renderJobDetailsPage);
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
