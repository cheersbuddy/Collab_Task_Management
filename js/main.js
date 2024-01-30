// elements

const radioViewOptions = document.querySelectorAll("input[name='view-option']");
const listView = document.getElementById("list-view");
const boardView = document.getElementById("board-view");
const addTaskCTA = document.getElementById("add-task-cta");
const setTaskOverlay = document.getElementById("set-task-overlay");
const closeButtons = document.querySelectorAll(".close-button");
const statusSelect = document.getElementById("status-select");
const statusDropdown = document.getElementById("status-dropdown");
const taskItems = document.querySelectorAll(".task-item");
const viewTaskOverlay = document.getElementById("view-task-overlay");
const deleteTaskCTA = document.getElementById("delete-task-cta");
const notification = document.getElementById("notification");
// the current active overlay
let activeOverlay = null;


// radio buttons for view option
radioViewOptions.forEach((radioButton) => {
  radioButton.addEventListener("change", (event) => {
    const eventTarget = event.target;
    const viewOption = eventTarget.value;

    switch (viewOption) {
      case "list":
        boardView.classList.add("hide");
        listView.classList.remove("hide");
        break;
      case "board":
        listView.classList.add("hide");
        boardView.classList.remove("hide");
        break;
    }
  });
});

// add task
addTaskCTA.addEventListener("click", () => {
  setTaskOverlay.classList.remove("hide");
  activeOverlay = setTaskOverlay;
  // disable scrolling for content behind the overlay
  document.body.classList.add("overflow-hidden");
});

// close buttons inside overlays
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeOverlay.classList.add("hide");
    activeOverlay = null;
    // reenable scrolling
    document.body.classList.remove("overflow-hidden");
  });
});

// open status dropdown
statusSelect.addEventListener("click", () => {
  statusDropdown.classList.toggle("hide");
});

// click a task
taskItems.forEach((task) => {
  task.addEventListener("click", () => {
    viewTaskOverlay.classList.remove("hide");
    activeOverlay = viewTaskOverlay;
    // disable scrolling for content behind the overlay
    document.body.classList.add("overflow-hidden");
  });
});

// delete a task
deleteTaskCTA.addEventListener("click", () => {
  activeOverlay.classList.add("hide");
  activeOverlay = null;
  // reenable scrolling
  document.body.classList.remove("overflow-hidden");
  // show notification & hide it after a while
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
});

// Add event listener to the form for adding tasks
const addTaskForm = document.getElementById("add-task-form");
addTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get input values
  const taskName = document.getElementById("name").value;
  const taskDescription = document.getElementById("description").value;
  const dueDateDay = document.getElementById("due-date-day").value;
  const dueDateMonth = document.getElementById("due-date-month").value;
  const dueDateYear = document.getElementById("due-date-year").value;
  const statusOption = document.querySelector(
    'input[name="status-option"]:checked'
  ).value;

  // Create a new task item with the obtained values
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  const taskButton = document.createElement("button");
  taskButton.classList.add("task-button");

  const taskNameElement = document.createElement("p");
  taskNameElement.classList.add("task-name");
  taskNameElement.textContent = taskName;

  const taskDueDateElement = document.createElement("p");
  taskDueDateElement.classList.add("task-due-date");
  taskDueDateElement.textContent = `Due on ${dueDateMonth} ${dueDateDay}, ${dueDateYear}`;

  taskButton.appendChild(taskNameElement);
  taskButton.appendChild(taskDueDateElement);

  taskItem.appendChild(taskButton);

  // Get the selected list container based on status
  console.log(`Selector: .list-container.${statusOption.toLowerCase()} .tasks-list`);
  const statusContainer = document.querySelector(
    `.list-container.${statusOption.toLowerCase()} .tasks-list`
  );
  console.log('Status Container:', statusContainer);
  

  // Append the new task item to the selected list container
  statusContainer.appendChild(taskItem);

  // Clear form fields
  addTaskForm.reset();
});
// Implement logic to display detailed information about the task
const tasksListContainer = document.getElementById("tasks-list-container");
tasksListContainer.addEventListener("click", function (event) {
  const taskButton = event.target.closest(".task-button");
  if (taskButton) {
    // Get task details
    const taskName = taskButton.querySelector(".task-name").textContent;
    const taskDueDate = taskButton.querySelector(".task-due-date").textContent;
    const statusOption = document.querySelector(
      'input[name="status-option"]:checked'
    ).value;

    // Display task details in the view-task-overlay
    const viewTaskOverlay = document.getElementById("view-task-overlay");
    viewTaskOverlay.querySelector(".header.no-margin").textContent = "Name";
    viewTaskOverlay.querySelector(".value").textContent = taskName;
    viewTaskOverlay.querySelector(".header").textContent = "Due date";
    viewTaskOverlay.querySelector(".value").textContent = taskDueDate;
    viewTaskOverlay.querySelector(".status-value span").className = `circle ${statusOption.toLowerCase()}-background`;
    viewTaskOverlay.querySelector(".status-value span").textContent = statusOption;

    // Show the view-task-overlay
    viewTaskOverlay.classList.remove("hide");
  }
});
function addTaskAndRedirect(event) {
  event.preventDefault();

  // Extract task details from the form
  const taskName = document.getElementById("name").value;
  const taskDescription = document.getElementById("description").value;
  // Extract other task details...

  // Save the task (e.g., store it in localStorage or send it to a server)
  saveTask(taskName, taskDescription);

  // Redirect to dashboard.html
  window.location.href = 'dashboard.html';
}

function saveTask(name, description) {
  // Implement logic to save the task (e.g., store it in localStorage or send it to a server)
  // You can use localStorage as a simple example:
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTask = { name, description };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Implement logic to update the UI with the added task on the dashboard
  // This may involve fetching the tasks and rendering them on the dashboard
  updateDashboardUI();
}

function updateDashboardUI() {
  // Implement logic to update the UI on the dashboard with the added tasks
  // This might include fetching tasks from storage and rendering them on the page
}
