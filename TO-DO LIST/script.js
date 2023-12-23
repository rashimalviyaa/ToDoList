document.addEventListener("DOMContentLoaded", function () {
  // Load tasks from local storage
  loadTasks();

  // Add event listener for the "Add Task" button
  document.getElementById("taskInput").addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
          addTask();
      }
  });
});

function addTask() {
  // Get task input value
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  // Check if the input is not empty
  if (taskText !== "") {
      // Create a new task item
      var taskList = document.getElementById("taskList");
      var li = document.createElement("li");
      li.innerHTML = `
          <span>${taskText}</span>
          <button onclick="removeTask(this)">Remove</button>
      `;

      // Add the task item to the task list
      taskList.appendChild(li);

      // Clear the input field
      taskInput.value = "";

      // Save tasks to local storage
      saveTasks();
  }
}

function removeTask(button) {
  // Remove the task item from the task list
  var li = button.parentNode;
  li.remove();

  // Save tasks to local storage
  saveTasks();
}

function saveTasks() {
  // Save tasks to local storage
  var taskList = document.getElementById("taskList");
  var tasks = [];
  for (var i = 0; i < taskList.children.length; i++) {
      var taskText = taskList.children[i].querySelector("span").innerText;
      tasks.push(taskText);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  // Load tasks from local storage
  var taskList = document.getElementById("taskList");
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add tasks to the task list
  tasks.forEach(function (taskText) {
      var li = document.createElement("li");
      li.innerHTML = `
          <span>${taskText}</span>
          <button onclick="removeTask(this)">Remove</button>
      `;
      taskList.appendChild(li);
  });
}