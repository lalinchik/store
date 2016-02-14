"use strict";

var xhr = new XMLHttpRequest();
xhr.open("GET", "products.json", true);
xhr.send();

xhr.addEventListener("error", function () {
    alert(xhr.status + ": " + xhr.statusText);
});

function getBag() {
    var bag = localStorage.getItem("bag");
    if (!bag) {
        bag = [];
    } else {
        bag = JSON.parse(bag);
    }
    return bag;
}

function contains(bag, candidate) {
    return bag.some(function (item) {
        return item.product.id == candidate.product.id && item.color == candidate.color && item.size == candidate.size;
    })
}
xhr.addEventListener("load", function (event) {
    let json = JSON.parse(xhr.responseText);

    var category = json.find(function (category) {
        return category.id == getQueryParams().categoryId;
    });

    if (product) {
        window.location = "notFound.html";
    }
    var product = category.products.find(function (product) {
        return product.id == getQueryParams().productId;
    });

    var bagItem = {
        product: product,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0]
    };


    var productEl = document.createElement("div");
    productEl.classList.add("product");
    productEl.innerHTML = `<div class="product-photos">
            <img class="big-photo" src="${product.images[0]}" alt="">
            <div class="small-photo-wrap">
                <div class="small-photo-container">
                    <img class="small-photo" src="${product.images[1]}" alt="">
                </div>
                <div class="small-photo-container">
                     <img class="small-photo" src="${product.images[2]}" alt="">
                 </div>
                 <div class="small-photo-container">
                    <img class="small-photo" src="${product.images[3]}" alt="">
                 </div>
            </div>
        </div>

        <div class="product-description">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-number">Article number: ${product.articleNumber}</p>
            <p class="product-price">€ ${product.price}</p>
            <p class="description-text">${product.description}</p>

            <div class="attribute">
                <h3>size</h3>

            </div>
        </div>

        <button class="buy">add to cart</button>`;

    product.sizes.forEach(function (size) {
        var attributeEl = document.createElement("button");
        attributeEl.classList.add("attribute-btn");
        attributeEl.textContent = size;


        attributeEl.addEventListener("click", function (event) {
            bagItem.size = size;
            var selectedSizeEl = productEl.querySelector(".attribute-btn.selected");
            if (selectedSizeEl) {
                selectedSizeEl.classList.remove("selected");
            }
            attributeEl.classList.add("selected");

        });

        productEl.querySelector(".attribute").appendChild(attributeEl);
    });

    productEl.querySelector(".attribute-btn").classList.add("selected");

    document.querySelector("main").insertBefore(productEl, document.querySelector(".gallery"));

    document.querySelector(".buy").addEventListener("click", function (event) {
        document.querySelector(".buy").classList.add("success");
        document.querySelector(".buy").textContent = "product added";

        var bag = getBag();

        if (!contains(bag, bagItem)) {
            bag.push(bagItem);
        }
        localStorage.setItem("bag", JSON.stringify(bag));
        document.querySelector(".quantity").textContent = bag.length;
    });

    let smallList = document.querySelectorAll(".small-photo");
    let smallArray = Array.prototype.slice.call(smallList, 0);
    smallArray.forEach(function (element) {
        element.addEventListener("click", function (event) {
            document.querySelector(".big-photo").src = this.src;
        });
    });
});

function getQueryParams() {
    var result = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        result[pair[0]] = pair[1];
    }

    return result;
}

   