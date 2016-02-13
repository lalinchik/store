"use strict";

function getGetOrdinal(n) {
    let s = ["th", "st", "nd", "rd"];
    let v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function updateTotal() {
    document.querySelector(".total-sum span").textContent = bag.reduce(function (sum, item) {
        return sum + item.product.price * item.quantity;
    }, 0);
}

var bag = JSON.parse(localStorage.getItem("bag"));
bag.forEach(function (item, index) {
    var itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `<div class="photo-wrapper">
        <img class="photo" src="${item.product.images[0]}" alt="">
     </div>
            <div class="column column1">
                <div class="description">
                    <h3 class="item-title">${item.product.name} (${getGetOrdinal(index + 1)})</h3>
                    <!--<span class="sequence-number">(3rt)</span>-->
                    <p class="order-number">Ref.${item.product.articleNumber}</p>
                </div>
                <span class="color">${item.color}</span>
                <span class="size">${item.size}</span>
                <input class="quantity" type="number" value="${item.quantity}">
            </div>
            <div class="column column2">
                <span class="amount">€ <span>${item.product.price * item.quantity}</span></span>
                <a class="delete" href="#">x</a>
            </div>`;

    document.querySelector(".order-cart").insertBefore(itemEl, document.querySelector(".subtotal"));


    itemEl.querySelector(".quantity").addEventListener("change", function (event) {
        item.quantity = this.value;
        itemEl.querySelector(".amount span").textContent = item.product.price * item.quantity;
        localStorage.setItem("bag", JSON.stringify(bag));
        updateTotal();
    });

    itemEl.querySelector(".delete").addEventListener("click", function (event) {
        event.preventDefault();
        bag.splice(index, 1);
        localStorage.setItem("bag", JSON.stringify(bag));
        itemEl.remove();
        updateTotal();
    });
});

updateTotal();

