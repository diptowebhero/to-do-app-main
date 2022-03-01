// // selecting all elements
let taskInput = document.querySelector("#newTaskInp");
let taskAddBtn = document.querySelector("#taskAddBtn");
let taskList = document.querySelector(".task_list");
let confirmBtn = document.querySelector("#confirm-btn");
let errorMsg = document.querySelector("#error");
taskAddBtn.addEventListener("click", function (e) {
  let newTaskInp = taskInput.value.trim();
  if (!newTaskInp || newTaskInp.length < 0) {
    errorMsg.textContent = "Please give a value in the input";
    return newTaskInp;
  }
  //clear input value
  taskInput.value = "";
  errorMsg.textContent = "";
  addNewTask(newTaskInp);
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

  let unique = text;
  let tasks = getTaskFromLocalStorage();

  tasks.forEach((task) => {
    if (task.trim() === text) {
      unique += " ";
    }
  });

  tasks.push(unique);
  setTaskInLocalStorage(tasks);
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
  const taskName = e.target.parentElement.firstElementChild.innerText;
  deleteTaskFromLocalStorage(taskName);
};

//delete task form local storage
const deleteTaskFromLocalStorage = (taskName) => {
  let tasks = getTaskFromLocalStorage();
  let index = tasks.indexOf(taskName);
  console.log(index);
  tasks.splice(index, 1);
  setTaskInLocalStorage(tasks);
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

      const tasks = getTaskFromLocalStorage();
      const index = tasks.indexOf(previousTask);
      tasks.splice(index, 1, updateValue);
      setTaskInLocalStorage(tasks);
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
  const tasks = getTaskFromLocalStorage();
  tasks.forEach((task) => {
    showTask(task);
  });
};

//get task in local storage
const getTaskFromLocalStorage = () => {
  let task;
  const data = localStorage.getItem("task");
  if (data) {
    task = JSON.parse(data);
  } else {
    task = [];
  }
  return task;
};

//set task in local storage
const setTaskInLocalStorage = (task) => {
  localStorage.setItem("task", JSON.stringify(task));
};

//show task
const showTask = (task) => {
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
