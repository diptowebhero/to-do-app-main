// // selecting all elements
let taskInput = document.querySelector("#newTaskInp");
let taskAddBtn = document.querySelector("#taskAddBtn");
let taskList = document.querySelector(".task_list");
let confirmBtn = document.querySelector("#confirm-btn");
let errorMsg = document.querySelector("#error");
taskAddBtn.addEventListener("click", function (e) {
  let newTaskInp = taskInput.value.toUpperCase().trim();;
  if (!newTaskInp || newTaskInp.length < 0) {
    errorMsg.textContent = "Please give a value in the input";
  } else {
    //clear input value
    taskInput.value = "";
    errorMsg.textContent = "";
    addNewTask(newTaskInp);
  }
});

function addNewTask(text) {
  let div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `
    <li>${text}</li>
    <button class="edit-btn">Edit</button>
    <button class="confirm-btn">Confirm</button>
    <button class="delete-btn">Delete</button>
    `;
  taskList.appendChild(div);
  const tasks = getDataLocalStorage();
  let unique = text;
  tasks.forEach((task) => {
    if (task.trim() === text) {
      unique += " ";
    }
  });
  tasks.push(unique);
  setDataLocalStorage(tasks);
}

//update,delete,confirm method
taskList.addEventListener("click", function (e) {
  if (e.target.className == "delete-btn") {
    deleteTask(e);
  } else if (e.target.className == "confirm-btn") {
    confirmTask(e);
  } else if (e.target.className == "edit-btn") {
    editTask(e);
  }
});

//delete task
const deleteTask = (e) => {
  e.target.parentElement.remove();
  let task = e.target.parentElement.firstElementChild.innerHTML;
  deleteTaskFormLocalStorage(task);
};

//delete task form local storage
const deleteTaskFormLocalStorage = (taskName) => {
  let task = getDataLocalStorage();
  let index = task.indexOf(taskName);
  task.splice(index, 1);
  setDataLocalStorage(task);
};

//confirm task
const confirmTask = (e) => {
  //confirm task
  let li = e.target.parentElement.firstElementChild;
  li.classList.toggle("confirmBtn");
};
//update task
const editTask = (e) => {
  //update taskList
  let li = e.target.parentElement.firstElementChild;
  let previousTask = li.innerText;
  li.innerText = "";

  // create new input for update value
  let input = document.createElement("input");
  input.type = "text";
  input.value = previousTask;

  input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      const updateValue = event.target.value;
      li.innerHTML = "";
      li.textContent = updateValue;
      e.target.style.display = "inline";
    }
  });

  li.appendChild(input);
  input.style.border = "none";
  input.style.padding = "5px 10px";
  input.style.background = "#e5e5e5";
  input.style.fontSize = "1rem";
  input.style.borderRadius = "10px";

  e.target.style.display = "none";
};
//local storage
window.onload = (e) => {
  let tasks = getDataLocalStorage();
  tasks.forEach((task) => {
    showTask(task);
  });
};

//get task in local storage
let getDataLocalStorage = () => {
  let task;
  const item = localStorage.getItem("task");
  if (item) {
    task = JSON.parse(item);
  } else {
    task = [];
  }
  return task;
};

//set task in local storage
const setDataLocalStorage = (task) => {
  localStorage.setItem("task", JSON.stringify(task));
};

//show task
let showTask = (task) => {
  let div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `
    <li>${task}</li>
    <button class="edit-btn">Edit</button>
    <button class="confirm-btn">Confirm</button>
    <button class="delete-btn">Delete</button>
    `;
  taskList.appendChild(div);
};
