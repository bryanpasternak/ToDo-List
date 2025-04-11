const express = require('express');
const { Low, JSONFileSync } = require('lowdb');
const path = require('path');

// 初始化数据库
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFileSync(file);
const db = new Low(adapter);

(async () => {
  await db.read();
  db.data ||= { tasks: [] }; // 初始化数据
  await db.write();
})();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // 托管前端文件

// API路由
app.get('/tasks', async (req, res) => {
  await db.read();
  res.json(db.data.tasks);
});

app.post('/tasks', async (req, res) => {
  await db.read();
  const newTask = {
    id: Date.now().toString(),
    text: req.body.text,
    completed: false
  };
  db.data.tasks.push(newTask);
  await db.write();
  res.status(201).json(newTask);
});

app.patch('/tasks/:id', async (req, res) => {
  await db.read();
  const task = db.data.tasks.find(t => t.id === req.params.id);
  if (task) {
    task.completed = req.body.completed;
    await db.write();
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  await db.read();
  const index = db.data.tasks.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    db.data.tasks.splice(index, 1);
    await db.write();
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});