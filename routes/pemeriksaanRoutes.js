const express = require('express');
const router = express.Router();
const pemeriksaanController = require('../controllers/pemeriksaanController');

router.get('/', pemeriksaanController.getAll);
router.get('/:id', pemeriksaanController.getById);
router.post('/', pemeriksaanController.create);

module.exports = router;
