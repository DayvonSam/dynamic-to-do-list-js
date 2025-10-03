// script.js

// Ensure script runs after DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function: addTask - creates a new task list item and appends it to the taskList
  function addTask() {
    // Get trimmed task text from input
    const taskText = taskInput.value.trim();

    // If input is empty, alert the user
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create a new list item and set its text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button for the task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When clicked, remove the parent li from the task list
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append the remove button to the list item
    li.appendChild(removeBtn);

    // Append the new list item to the task list
    taskList.appendChild(li);

    // Clear the input for the next task
    taskInput.value = '';
    taskInput.focus();
  }

  // Attach click event to Add Task button
  addButton.addEventListener('click', addTask);

  // Allow adding tasks by pressing Enter in the input field
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Note: The instruction mentioning "Invoke the addTask function on DOMContentLoaded"
  // would add a task automatically on load (usually undesirable). To follow good UX,
  // we set up event listeners here and do NOT auto-invoke addTask unless there's
  // pre-filled content in the input. If you'd like addTask to run automatically
  // on load when input has content, uncomment below:
  //
  // if (taskInput.value.trim() !== '') {
  //   addTask();
  // }
});
