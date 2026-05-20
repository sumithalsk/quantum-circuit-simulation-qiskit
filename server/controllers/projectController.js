const Project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res, next) => {
  try {
    const { name, description, members } = req.body;
    if (!name) return res.status(400).json({ message: 'Project name required' });
    const project = new Project({
      name,
      description,
      createdBy: req.user._id,
      members: members || []
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    let projects;
    if (req.user.role === 'Admin') {
      projects = await Project.find().populate('members', 'name email role');
    } else {
      projects = await Project.find({ members: req.user._id }).populate('members', 'name email role');
    }
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, members } = req.body;
    const project = await Project.findByIdAndUpdate(
      id,
      { name, description, members },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
