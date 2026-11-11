const express = require('express');
const router = express.Router();
const dokterHewanController = require('../controllers/dokterHewanController');

router.get('/', dokterHewanController.getAll);
router.post('/', dokterHewanController.create);

module.exports = router;
