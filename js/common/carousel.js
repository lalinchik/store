"use strict";
let smallList = document.querySelectorAll(".small-photo");
let smallArray = Array.prototype.slice.call(smallList, 0);
console.log(smallList);
console.log(smallArray);
smallArray.forEach(function (element) {
    element.addEventListener("click", function (event) {
        document.querySelector(".big-photo").src = this.src;
    });
});