const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/profile', (req, res) => {
  res.send('User profile route');
});
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;
