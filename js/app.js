// // selecting all elements
let taskInput = document.querySelector("#newTaskInp");
let taskAddBtn = document.querySelector("#taskAddBtn");
let taskList = document.querySelector(".task_list");
let confirmBtn = document.querySelector("#confirm-btn");
let errorMsg = document.querySelector("#error")
taskAddBtn.addEventListener("click", function (e) {
  let newTaskInp = taskInput.value;
  if (!newTaskInp) {
    errorMsg.textContent = "Please give a value in the input"
  } else {
    //clear input value
    taskInput.value = "";
    errorMsg.textContent = "";
    addNewTask(newTaskInp);
  }
});

function addNewTask(task) {
  let div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `
    <li>${task}</li>
    <button class="edit-btn">Edit</button>
    <button class="confirm-btn">Confirm</button>
    <button class="delete-btn">Delete</button>
    `;
  taskList.appendChild(div);
}

//update,delete,confirm method
taskList.addEventListener("click", function (e) {
  if (e.target.className == "delete-btn") {
    //remove task
    e.target.parentElement.remove();
  } else if (e.target.className == "confirm-btn") {
    //confirm task
    let li = e.target.parentElement.firstElementChild;
    li.classList.toggle("confirmBtn");
  } else if (e.target.className == "edit-btn") {
    //update taskList
    let li = e.target.parentElement.firstElementChild;
    let previousTask = li.innerText;
    li.innerText = "";

    // create new input for update value
    let input = document.createElement("input");
    input.type = "text";
    input.value = previousTask;

    input.addEventListener("keypress", function (event) {
      if(event.key == "Enter") {
        const updateValue = event.target.value;
        li.innerHTML = '';
        li.textContent = updateValue;
        e.target.style.display = "inline";
      }
    })

    li.appendChild(input);
    input.style.border = "none";
    input.style.padding = "5px 10px";
    input.style.background = "#e5e5e5";
    input.style.fontSize = "1rem";
    input.style.borderRadius = "10px";

    e.target.style.display = "none";
  }
});

