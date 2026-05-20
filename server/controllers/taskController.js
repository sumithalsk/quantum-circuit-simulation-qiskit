const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo, projectId } = req.body;
    if (!title || !projectId) return res.status(400).json({ message: 'Title and project required' });
    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      projectId,
      createdBy: req.user._id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === 'Member') {
      filter.assignedTo = req.user._id;
    }
    if (req.query.status) filter.status = req.query.status;
    if (req.query.projectId) filter.projectId = req.query.projectId;
    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name');
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    // Only allow member to update their own task status
    if (req.user.role === 'Member' && String(task.assignedTo) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    Object.assign(task, updates);
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    // Only admin or creator can delete
    if (req.user.role !== 'Admin' && String(task.createdBy) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
