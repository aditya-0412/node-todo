const Todo = require("../models/Todo");

/* GET all todos */
exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

/* CREATE todo */
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({ text: req.body.text });
    res.status(201).json(todo);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.errors.text.message,
      });
    }
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE todo */
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // VERY IMPORTANT
    );
    res.json(todo);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.errors.text.message,
      });
    }
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE todo */
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
