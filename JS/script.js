let request = new XMLHttpRequest();
request.open("GET", "../DATA/products.json", false);
request.send(null);
let allProducts = JSON.parse(request.responseText);
addShopItems();

function addShopItems(){
    for(let i = 0; i < allProducts.length; i++){
        let el = document.createElement("div");
        el.className = "buy";
        el.innerHTML = allProducts[i].name;
        let buyTextEl = document.createElement("h4");
        buyTextEl.innerHTML = "buy";
        let itemPriceEl = document.createElement("span");
        itemPriceEl.className = "price";
        itemPriceEl.innerHTML = allProducts[i].price + ":-";
        el.appendChild(buyTextEl);
        el.appendChild(itemPriceEl);
        el.addEventListener("click", () => {
            price = allProducts[i].price;
            itemName = allProducts[i].name;
            addCartItem(itemName, price);
            updateCartPrice();
        })
        document.querySelector("#buyContainer").appendChild(el);
    }
}

let menu = false;
let cartMenu = false;
let darkMode = false;
let cartItems = [];
let nextCartId = 0;

function toggleHmbrgMenu() {
    menu = !(menu);
    document.querySelector('#container').classList.toggle("change");
    document.querySelector('.dropDownMenu').classList.toggle("open");
    if(menu){
        setTimeout(function(){ document.body.classList.toggle("menuOpen"); }, 300);
    } else{
        document.body.classList.toggle("menuOpen");
    }
}

function toggleDarkMode() {
    document.querySelector("body").classList.toggle("darkMode");
    if(!(darkMode)){
        darkMode = true;
        document.querySelector("#colorModeText").innerHTML = "Dark Mode";
    } else {
        darkMode = false;
        document.querySelector("#colorModeText").innerHTML =  "Light Mode";
    }
}

function addCartItem(itemName, cost){
    let existing = false;
    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i].item == itemName){
            existing = true;
            cartItems[i].count += 1;
        }
    }
    if(!(existing)){
        cartItems.push({item: itemName, price: cost, count: 1, id: nextCartId});
        nextCartId++;
    }
    updateCartList();
}

function showCart(){
    cartMenu = !(cartMenu);
    document.querySelector("#cartDiv").classList.toggle("cartOpen");
    if(cartMenu){
        setTimeout(function(){ document.body.classList.toggle("cartMenuOpen"); }, 300);
    } else{
        document.body.classList.toggle("cartMenuOpen");
    }
    
}

function updateCartList(){
    let x = 0;
    document.querySelectorAll(".cartItem").forEach(el => {
        el.remove();
    });

    for(let i = 0; i < cartItems.length; i++){
        x++;
        let newCartItem = document.createElement("li");
        newCartItem.innerHTML = cartItems[i].item;
        newCartItem.classList.add("cartItem");
        let newCartItemCost = document.createElement("span");
        newCartItemCost.innerHTML = cartItems[i].price + ":-";
        newCartItem.appendChild(newCartItemCost);
        let newCartItemCount = document.createElement("div");
        newCartItemCount.innerHTML = "x" + cartItems[i].count;
        newCartItemCount.classList.add("cartItemCount");
        let countAdd = document.createElement("div");
        countAdd.classList.add("countAdd");
        let plusSign = document.createElement("div");
        plusSign.classList.add("plusSign");
        plusSign.innerHTML = "+";
        plusSign.addEventListener("click", () => {
            cartItems[i].count++;
            updateCartList();
            updateCartPrice();
        });
        let minusSign = document.createElement("div");
        minusSign.classList.add("minusSign");
        minusSign.innerHTML = "-";
        minusSign.addEventListener("click", el => {
            cartItems[i].count--;
            if(cartItems[i].count == 0){
                cartItems.splice(i, 1);
            }
            updateCartList();
            updateCartPrice();
        });
        let countRemove = document.createElement("div");
        countRemove.classList.add("countRemove");
        countAdd.appendChild(plusSign);
        countRemove.appendChild(minusSign);
        newCartItemCount.appendChild(countAdd);
        newCartItemCount.appendChild(countRemove);
        newCartItem.appendChild(newCartItemCount);
        document.querySelector("#cartList").appendChild(newCartItem);
    }
    if(x == 0){
        let emptyCart = document.createElement("div");
        emptyCart.className = "cartItem";
        emptyCart.innerHTML = "Your cart is empty";
        document.querySelector("#cartList").appendChild(emptyCart);
    }
}

function updateCartPrice(){
    let price = 0;
    for(let i = 0; i < cartItems.length; i++){
        price += cartItems[i].price * cartItems[i].count;
    }
    document.querySelector("#cartValue").innerHTML = price;
}