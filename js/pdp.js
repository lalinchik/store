"use strict";

var xhr = new XMLHttpRequest();
xhr.open("GET", "products.json", true);
xhr.send();

xhr.addEventListener("error", function () {
    alert(xhr.status + ": " + xhr.statusText);
});

function getBag() {
    var bag = localStorage.getItem("bag");

    if (bag === 0) {
        bag = [];
    } else {
        bag = JSON.parse(bag);
    }
    return bag;
}
function contains(bag, candidate) {
    return bag.some(function (item) {
        return item.product.id == candidate.product.id;
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


    var productEl = document.createElement("div");
    productEl.classList.add("product");
    productEl.innerHTML = `<div class="product-photos">
            <img class="big-photo" src="${product.images[0]}" alt="">
            <div class="small-photo-wrap">
            <img class="small-photo" src="${product.images[1]}" alt="">
            <img class="small-photo" src="${product.images[2]}" alt="">
            <img class="small-photo" src="${product.images[3]}" alt="">
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
        productEl.querySelector(".attribute").appendChild(attributeEl);
    });

    document.querySelector("main").insertBefore(productEl, document.querySelector(".gallery"));

    document.querySelector(".buy").addEventListener("click", function (event) {
        var bagItem = {
            product: product,
            quantity: 1,
            size: product.sizes[0],
            color: product.colors[0]
        };
        var bag = getBag();

        if (!contains(bag, bagItem)) {
            bag.push(bagItem);
        } else {
            var foundItem = bag.find(function (item) {
                return item.product.id === bagItem.product.id;
            });
            foundItem.quantity++;
        }
        localStorage.setItem("bag", JSON.stringify(bag));
        window.location = "shop-cart.html";
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

   