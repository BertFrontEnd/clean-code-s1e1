// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById('new-task'); // Add a new task.
var addButton = document.getElementsByTagName('button')[0]; // First button
var incompleteTaskHolder = document.getElementById('main__incomplete-tasks'); // ul of #main__incomplete-tasks
var completedTasksHolder = document.getElementById('main__completed-tasks'); // main__completed-tasks

// New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li');

  // input (checkbox)
  var checkBox = document.createElement('input'); // checkbox
  // label
  var label = document.createElement('label'); // label
  // input (text)
  var editInput = document.createElement('input'); // text
  // button.edit
  var editButton = document.createElement('button'); // edit button

  // button.delete
  var deleteButton = document.createElement('button'); // delete button
  var deleteButtonImg = document.createElement('img'); // delete button image

  label.innerText = taskString;
  label.className = 'task';

  // Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //  innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './assets/icon/remove.svg';
  deleteButtonImg.setAttribute('alt', 'remove');
  deleteButton.appendChild(deleteButtonImg);

  // And appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log('Add Task...');
  // Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

// Edit an existing task.

var editTask = function () {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var editBtn = listItem.querySelector('.edit');
  var containsClass = listItem.classList.contains(
    'incomplete-tasks__edit-mode',
  );
  // If class of the parent is .incomplete-tasks__edit-mode
  if (containsClass) {
    // Switch to .incomplete-tasks__edit-mode
    // Label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  // Toggle .incomplete-tasks__edit-mode on the parent.
  listItem.classList.toggle('incomplete-tasks__edit-mode');
};

// Delete task.
var deleteTask = function () {
  console.log('Delete Task...');

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

// Mark task completed
var taskCompleted = function () {
  console.log('Complete Task...');

  // Append the task list item to the #main__completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('Incomplete Task...');
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #main__incomplete-tasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log('AJAX Request');
};

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  // Select ListItems children
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');

  // Bind editTask to edit button.
  editButton.onclick = editTask;
  // Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

// Cycle over incompleteTaskHolder ul list items
// For each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  // Bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  // Bind events to list items children(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

// prevent creation of empty tasks.

// Change edit to save when you are in edit mode.
