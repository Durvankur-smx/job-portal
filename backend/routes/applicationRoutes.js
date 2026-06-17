const express = require('express');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

router.get('/', applicationController.getAllApplications);
router.get('/status', (req, res) => {
  res.send('Application status route');
});
router.get('/:id', applicationController.getApplicationById);
router.post('/', applicationController.createApplication);

module.exports = router;
