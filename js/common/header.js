document.querySelector(".search-icon").addEventListener("click", function(event){
    document.querySelector(".search.collapsed").classList.remove("collapsed");
});

if(JSON.parse(localStorage.getItem("bag")) != null) {
    document.querySelector(".quantity").textContent = JSON.parse(localStorage.getItem("bag")).length;
} else {
    document.querySelector(".quantity").textContent = 0;
}
