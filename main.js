document.addEventListener('DOMContentLoaded', () => {
    // Inject restaurant info
    const restaurantInfo = document.getElementById('restaurant-info');
    restaurantInfo.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p>${restaurant.description} <br>${restaurant.location}</p>
    `;

    // Inject order items
    const orderItemsContainer = document.getElementById('order-items');
    orderItems.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('info_order_content');
        orderItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>₹ ${item.price}</p>
            </div>
            <div class="bnt"><button onclick="addToCart('${item.name}', ${item.price})">ADD</button></div>
        `;
        orderItemsContainer.appendChild(orderItem);
        const line = document.createElement('div');
        line.classList.add('line');
        orderItemsContainer.appendChild(line);
    });

    // Inject cart items
    const cartItemsContainer = document.getElementById('cart-items');
    updateCart();

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <p>${item.name}</p>
                <div class="cart_price">
                    <div class="button-group">
                        <button class="operation-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span><button class="number-btn">${item.quantity}</button></span>
                        <span><button class="operation-btn" onclick="updateQuantity('${item.name}', 1)">+</button></span>
                    </div>
                    <div> ₹ ${item.price * item.quantity}</div>
                </div>
            `;
            const line = document.createElement('div');
            line.classList.add('card_line');
            cartItemsContainer.appendChild(cartItem);
            cartItemsContainer.appendChild(line);
        });

        // Inject cart summary
        const cartSummary = document.getElementById('cart-summary');
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryCharge = 45;
        const couponDiscount = 90;
        const grandTotal = subtotal + deliveryCharge - couponDiscount;

        cartSummary.innerHTML = `
            <div class="total-section"><b>Subtotal</b> <span>₹ ${subtotal}</span></div>
            <div class="total-section">Delivery Charge <span>₹ ${deliveryCharge}</span></div>
            <div class="total-section">Coupon(SUPER) <span>₹ ${couponDiscount}</span></div>
            <div class="total-section"><b>Grand Total</b> <span>₹ ${grandTotal}</span></div>
        `;
    }

    function showRecommendations() {
        const recommendationsContainer = document.createElement('div');
        recommendationsContainer.classList.add('recommendations');
        recommendationsContainer.innerHTML = `
            <h2>Try These!</h2>
        `;
        recommendations.forEach(item => {
            const recommendationItem = document.createElement('div');
            recommendationItem.classList.add('info_order_content');
            recommendationItem.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>₹ ${item.price}</p>
                </div>
                <div class="bnt"><button onclick="addToCart('${item.name}', ${item.price})">ADD</button></div>
            `;
            recommendationsContainer.appendChild(recommendationItem);
            const line = document.createElement('div');
            line.classList.add('line');
            recommendationsContainer.appendChild(line);
        });
        orderItemsContainer.appendChild(recommendationsContainer);
    }

    window.addToCart = (name, price) => {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ name, quantity: 1, price });
        }
        updateCart();
        // Show recommendations after adding the first item
        if (cartItems.length === 1) {
            showRecommendations();
        }
    };

    window.updateQuantity = (name, change) => {
        const item = cartItems.find(item => item.name === name);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cartItems.splice(cartItems.indexOf(item), 1);
            }
        }
        updateCart();
    };
    
});
