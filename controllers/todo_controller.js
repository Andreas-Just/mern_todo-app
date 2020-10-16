const Todo = require('../models/Todo');

// Task creation
const generateTodo = async (req, res) => {
  try {
    const { name, description, date, time } =  req.body;
    const existing = await Todo.findOne({ date, time });

    if (existing) {
      res.status(403).json({
        message: 'Task with such date and time already exists'
      });
      return res.json({ todo: existing });
    }

    const todo = new Todo({
      name, description, date, time, owner: req.user.userId,
    });

    await todo.save();
    res.status(201).json({ todo });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

// Getting all tasks
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user.userId });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

// Getting a task by ID
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

module.exports = {
  generateTodo,
  getTodos,
  getTodo,
};
