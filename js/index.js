document.querySelector(".prev").addEventListener("click", function(event){
    event.preventDefault();
    document.querySelector(".photos-container").scrollLeft -= 200;
});

document.querySelector(".next").addEventListener("click", function(event){
    event.preventDefault();
    document.querySelector(".photos-container").scrollLeft += 200;
});