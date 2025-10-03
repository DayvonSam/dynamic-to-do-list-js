// script.js

// Ensure code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements (required constant names)
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Array that holds current tasks (persisted to localStorage under 'tasks')
  let tasks = [];

  /**
   * addTask
   * Adds a task to the DOM and optionally saves it to localStorage.
   * @param {string|null} taskText - text to add; if null, reads from input field
   * @param {boolean} save - whether to save to localStorage (default true)
   */
  function addTask(taskText = null, save = true) {
    // Determine task text (from parameter or from input field)
    if (taskText === null) {
      taskText = taskInput.value.trim();
    } else {
      taskText = String(taskText).trim();
    }

    // If the task text is empty, alert the user and do not add
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new <li> element and set its textContent to taskText
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button, set text and required class via classList.add
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-btn');

    // Assign an onclick event to remove the li from taskList and update storage
    removeBtn.onclick = function () {
      // Determine the index of this li among taskList children
      const liIndex = Array.prototype.indexOf.call(taskList.children, li);

      // If found in tasks array, remove item and update localStorage
      if (liIndex > -1) {
        tasks.splice(liIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      // Remove the element from the DOM
      taskList.removeChild(li);
    };

    // Append remove button to li, then append li to the task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // If save is true, add this task text to tasks array and update localStorage
    if (save) {
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Clear the task input field
    taskInput.value = "";
  }

  /**
   * loadTasks
   * Loads tasks from localStorage and displays them (without re-saving).
   */
  function loadTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(storedTask => {
      addTask(storedTask, false); // false -> don't save again to localStorage
    });
  }

  // Attach event listener to addButton that calls addTask when clicked
  addButton.addEventListener('click', function () {
    addTask();
  });

  // Attach event listener to taskInput to allow adding with Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load saved tasks from localStorage when the page loads
  loadTasks();
});
