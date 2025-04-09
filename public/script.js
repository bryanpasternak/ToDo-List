document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById('add-task-form').addEventListener('submit', addTask);
  });
  
  async function loadTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => renderTask(task));
  }
  
  async function addTask(e) {
    e.preventDefault();
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText) {
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: taskText })
      });
      if (response.ok) {
        taskInput.value = '';
        loadTasks();
      }
    }
  }
  
  function renderTask(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
    taskItem.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(taskItem);
  
    // 绑定事件
    const checkbox = taskItem.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => toggleTask(task.id, checkbox.checked));
  
    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
  }
  
  async function toggleTask(id, completed) {
    await fetch(`/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    loadTasks();
  }
  
  async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
  }