const addTaskBTN = document.querySelector(".btn__add-task")
const deleteTaskBTN = document.querySelector(".btn__delete-task")
const createTaskBTN = document.querySelector(".btn__new-task")

const newTaskCont = document.querySelector(".task-list__new-task")

addTaskBTN.addEventListener("click", function() {
    newTaskCont.classList.remove("hidden")
    newTaskCont.classList.remove("hidden__no-space")
    addTaskBTN.classList.add("hidden")
})

createTaskBTN.addEventListener("click", function() {
    newTaskCont.classList.add("hidden")
    newTaskCont.classList.add("hidden__no-space")
    addTaskBTN.classList.remove("hidden")
})

// let taskList = [];

// const createTask = function() {
    
// }
// localStorage.setItem("names", JSON.stringify(names));

// //...
// var storedNames = JSON.parse(localStorage.getItem("names"));
// console.log(storedNames);