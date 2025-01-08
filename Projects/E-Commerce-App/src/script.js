document.addEventListener("DOMContentLoaded", function () {
    let products = [
        {id: 1,name: "Product 1",price: 10.99,},
        {id: 2,name: "Product 2",price: 15.99,},
        {id: 3,name: "Product 3",price: 7.99,},
        {id: 4,name: "Product 4",price: 12.99,},
    ];
    let cart = [];
    let cartList = document.getElementById("cart-items");
    let productList = document.getElementById("products-list");
    let emptyCartMessage = document.getElementById("empty-cart");
    let cartTotalMessgae = document.getElementById("cart-total");
    let totalPriceDisplay = document.getElementById("total-price");
    let checkoutButton = document.getElementById("checkout-btn");

    products.forEach((product) => {
        let productDiv = document.createElement("div");
        // productDiv.classList.add("product");
        productDiv.classList.add("addtocart");
        productDiv.innerHTML = `
           <p class="text-white text-2xl">${product.name}</p>
                <button data-id="${product.id}" class="text-white border border-white p-3 rounded-xl">Add to cart</button>
        `;
        // console.log(productDiv.innerHTML)
        productList.appendChild(productDiv);
        productDiv.addEventListener("click", function (event) {
            if (event.target.tagName === "BUTTON") {
                let productId = parseInt(event.target.getAttribute("data-id"));
                let product = products.find((p) => p.id === productId);
                if (product) {
                    cart.push(product);
                    updateCart();
                }
            }
        });
        
    });
    // write the update cart function
    function updateCart() {
        cartList.innerHTML = "";
        cart.forEach((item) => {
            let cartItem = document.createElement("div");
            cartList.appendChild(cartItem);
        });
        if (cart.length === 0) {
            emptyCartMessage.style.display = "block";
        } else {
            emptyCartMessage.style.display = "none";
        }
        let totalPrice = cart.reduce((total, item) => total + item.price, 0);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        cartTotalMessgae.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cartTotalMessgae.style.display = "block";

    }


    
    
});