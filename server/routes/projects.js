const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

router.get('/', auth, getProjects);
router.post('/', auth, role(['Admin']), createProject);
router.put('/:id', auth, role(['Admin']), updateProject);
router.delete('/:id', auth, role(['Admin']), deleteProject);

module.exports = router;
