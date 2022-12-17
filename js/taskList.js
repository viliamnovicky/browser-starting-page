const addTaskBTN = document.querySelector(".btn__add-task");
const deleteTaskBTN = document.querySelector(".btn__delete-task");
const createTaskBTN = document.querySelector(".btn__new-task");

const taskCont = document.querySelector(".task-list__cont");
const newTaskCont = document.querySelector(".task-list__new-task");
const newTaskInput = document.querySelector(".task-list__new-task--input");

let taskList;
localStorage.getItem("tasklist")
  ? (taskList = JSON.parse(localStorage.getItem("tasklist")))
  : (taskList = []);

const createTask = function () {
  const newTask = newTaskInput.value;
  console.log(newTask);
  taskList.push({ task: newTask });
  localStorage.setItem("tasklist", JSON.stringify(taskList));
  taskList = JSON.parse(localStorage.getItem("tasklist"));
  console.log(taskList);
};

const loadTasks = function () {
  taskList.map((task, index) =>
    taskCont.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="task-list__task task${index}" id = "task${index}">
        <input class="task-list__checkbox" type="checkbox" name="box${index}" id="box${index}">
        <span class="task-list__radio"></span>
        <label class="task-list__label" for="box${index}">${task === null ? console.log("nothing") : task.task}</label>
    </div>
    `
    )
  );
};

const deleteTasks = function() {
  let newList = []
  const tasks = [...document.querySelectorAll(".task-list__checkbox")].reverse()
  console.log(tasks[0].checked);
  console.log(taskList);
  tasks.map((task, index) => {if (task.checked) {
  newList.push(taskList[index]) 
    }}
  )
  
  taskList = taskList.filter(task => !newList.includes(task))
  console.log(taskList);

  localStorage.setItem("tasklist", JSON.stringify(taskList));
  taskList = JSON.parse(localStorage.getItem("tasklist"));
  taskCont.innerHTML = ""
  loadTasks()
  console.log(newList);
}

addTaskBTN.addEventListener("click", function () {
  newTaskCont.classList.remove("hidden");
  newTaskCont.classList.remove("hidden__no-space");
  addTaskBTN.classList.add("hidden");
  newTaskInput.value = ""
});

createTaskBTN.addEventListener("click", function () {
  newTaskCont.classList.add("hidden");
  newTaskCont.classList.add("hidden__no-space");
  addTaskBTN.classList.remove("hidden");
  taskCont.innerHTML = "";
  createTask();
  loadTasks();
});

deleteTaskBTN.addEventListener("click", function() {
  deleteTasks()
  //taskCont.innerHTML = ""
})

loadTasks()