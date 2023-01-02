const darkModeBTN = document.querySelector(".btn__dark-mode")

darkModeBTN.addEventListener("click", function() {
    document.querySelector(".body").classList.add("inverse")
})