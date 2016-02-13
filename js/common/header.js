document.querySelector(".search-icon").addEventListener("click", function(event){
    document.querySelector(".search.collapsed").classList.remove("collapsed");
});

document.querySelector(".quantity").textContent = JSON.parse(localStorage.getItem("bag")).length;
