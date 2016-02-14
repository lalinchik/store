"use strict";

var xhr = new XMLHttpRequest();
xhr.open("GET", "products.json", true);
xhr.send();

xhr.addEventListener("error", function () {
    alert(xhr.status + ": " + xhr.statusText);
});

xhr.addEventListener("load", function (event) {
    let json = JSON.parse(xhr.responseText);

    const categoryElements = json.map(function (category) {
        var categoryEl = document.createElement("section");
        categoryEl.classList.add("category");
        categoryEl.id = category.category.split(" ").join("-");

        categoryEl.innerHTML = `<div class="hero">
        <h2 class="block-title">${category.category}</h2>
        <a class="show link" href="">show more</a>
        </div>`;

        category.products.forEach(function (product) {
            let productEl = document.createElement("div");
            productEl.classList.add("goods-item");
            productEl.innerHTML = `<a href="pdp.html?categoryId=${category.id}&productId=${product.id}" class="wrap-img">
                <img src="${product.images[0]}" alt="1">
            </a>
            <h3 class="goods-name">${product.name}</h3>
            <span class="goods-price">€ ${product.price}</span>`;
            categoryEl.appendChild(productEl);
        });

        return categoryEl;
    });

    categoryElements.forEach(function (categoryEl) {
        document.querySelector("main").insertBefore(categoryEl, document.querySelector(".gallery-title"));
    })
});