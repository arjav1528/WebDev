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
    let cartTotal = document.getElementById("cart-total");
    let totalPriceDisplay = document.getElementById("total-price");
    let checkoutButton = document.getElementById("checkout-btn");
    // updateCart();

    products.forEach((product) => {
        let productDiv = document.createElement("div");
        // productDiv.classList.add("product");
        productDiv.classList.add("productContainer");
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
    
    
    
    function updateCart() {
        // cartList.innerHTML = "";
        cart.forEach((item) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cartContainer");
            cartItem.innerHTML = `
            <p class="text-white text-2xl">${item.name} : <span>${item.price}</span></p>
                

            `;
            // if(cartItem.querySelector("button")){
                
            //     cartItem.querySelector("button").addEventListener("click", function (event) {
            //         let itemId = parseInt(event.target.getAttribute("data-id").split("-")[1]);
            //         cart = cart.filter((p) => p.id !== itemId);
            //         updateCart();
            //     });

            // }
                

            
            cartList.appendChild(cartItem);

        });
        
        let totalPrice = cart.reduce((total, item) => total + item.price, 0);
        totalPriceDisplay.textContent = `Total : $${totalPrice.toFixed(2)}`;
        if(cart.length === 0){
            emptyCartMessage.style.display = "block";
            cartTotal.classList.add("hidden");
        }
        else{
            emptyCartMessage.style.display = "none";
            cartTotal.classList.remove("hidden");
        }
        
    }

    checkoutButton.addEventListener("click", function () {
        if((cart.length === 0)){
            alert("Your cart is empty!");
            return;
        }
        else{
            cart = [];
            cartList.innerHTML = `<p class="text-white text-center p-4" id="empty-cart">Your cart is empty</p>`;
            totalPriceDisplay.textContent = "Total : $0.00";
            emptyCartMessage.style.display = "block";
            cartTotal.classList.add("hidden");
        }


        alert("Thank you for your purchase!");
    });



        
        
        



    
    
});