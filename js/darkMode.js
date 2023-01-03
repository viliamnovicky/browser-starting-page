const darkModeBTN = document.querySelector(".btn__mode--dark")
const lightModeBTN = document.querySelector(".btn__mode--light")

darkModeBTN.addEventListener("click", function() {
    document.querySelector(".body").classList.add("inverse")
    document.querySelector(".task-list").classList.add("inverse__cont")
    document.querySelector(".task-list__outer").classList.add("inverse__cont")
    document.querySelector(".task-list__new-task").classList.add("inverse__cont")
    document.querySelectorAll(".task-list__task").forEach(task => task.classList.add("inverse__cont"))
    document.querySelector(".task-list__buttons").classList.add("inverse__cont")

    document.querySelector(".diesel-div").classList.add("inverse__cont")
    document.querySelectorAll(".diesel__text").forEach(task => task.classList.add("inverse__text"))
    
    document.querySelectorAll(".crypto-div").forEach(task => task.classList.add("inverse__cont"))
    document.querySelectorAll(".coin__text").forEach(task => task.classList.add("inverse__text"))

    lightModeBTN.classList.remove("hidden")
    darkModeBTN.classList.add("hidden")
})

lightModeBTN.addEventListener("click", function() {
    document.querySelector(".body").classList.remove("inverse")
    document.querySelector(".task-list").classList.remove("inverse__cont")
    document.querySelector(".task-list__outer").classList.remove("inverse__cont")
    document.querySelector(".task-list__new-task").classList.add("inverse__cont")
    document.querySelectorAll(".task-list__task").forEach(task => task.classList.remove("inverse__cont"))
    document.querySelector(".task-list__buttons").classList.remove("inverse__cont")

    document.querySelector(".diesel-div").classList.remove("inverse__cont")
    document.querySelectorAll(".diesel__text").forEach(task => task.classList.remove("inverse__text"))

    document.querySelectorAll(".crypto-div").forEach(task => task.classList.remove("inverse__cont"))
    document.querySelectorAll(".coin__text").forEach(task => task.classList.remove("inverse__text"))
    
    lightModeBTN.classList.add("hidden")
    darkModeBTN.classList.remove("hidden")
})