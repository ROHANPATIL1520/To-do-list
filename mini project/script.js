// Select elements
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const clearTasksButton = document.getElementById("clear-tasks");
const taskCountDisplay = document.getElementById("task-count");

let totalTasks = 0;
let completedTasks = 0;

// Function to update task count display
function updateTaskCount() {
  taskCountDisplay.textContent = `Total Tasks: ${totalTasks} | Completed: ${completedTasks}`;
}

// Add task function
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // Create task item
  const listItem = document.createElement("li");

  // Task text and priority
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const prioritySpan = document.createElement("span");
  prioritySpan.textContent = `[${priority}]`;
  prioritySpan.className = "priority";

  // Mark as done button
  const completeButton = document.createElement("button");
  completeButton.textContent = "Done";
  completeButton.addEventListener("click", () => {
    listItem.classList.toggle("completed");
    completedTasks = listItem.classList.contains("completed")
      ? completedTasks + 1
      : completedTasks - 1;
    updateTaskCount();
  });

  // Edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    const newTaskText = prompt("Edit your task:", taskSpan.textContent);
    if (newTaskText) {
      taskSpan.textContent = newTaskText.trim();
    }
  });

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    if (listItem.classList.contains("completed")) {
      completedTasks--;
    }
    totalTasks--;
    taskList.removeChild(listItem);
    updateTaskCount();
  });

  // Append elements to list item
  listItem.appendChild(taskSpan);
  listItem.appendChild(prioritySpan);
  listItem.appendChild(completeButton);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  // Append task item to task list
  taskList.appendChild(listItem);

  // Add animation to the new task item
  listItem.classList.add("show");

  // Clear input and update task count
  taskInput.value = "";
  totalTasks++; // Increment total task count
  updateTaskCount();
});

// Clear all tasks function
clearTasksButton.addEventListener("click", () => {
  taskList.innerHTML = ""; // Remove all tasks
  totalTasks = 0; // Reset total tasks
  completedTasks = 0; // Reset completed tasks
  updateTaskCount(); // Update task count display
});

// Add the 'loaded' class to body when the page has loaded
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
