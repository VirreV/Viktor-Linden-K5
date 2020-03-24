let menu = false;
let cartMenu = false;
let darkMode = false;
let cartItems = [];

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

document.querySelectorAll(".buy").forEach(el => {
    el.addEventListener("click", () => {
        let price = parseInt(el.querySelector(".price").innerHTML.substring(0, el.querySelector(".price").innerHTML.length - 2));
        let cart = parseInt(document.querySelector("#cartValue").innerHTML);
        cart += price;
        document.querySelector("#cartValue").innerHTML = cart;
        let itemName = el.querySelector(".item").innerHTML;
        addCartItem(itemName, price);
    })
})

function addCartItem(itemName, cost){
    cartItems.push({item: itemName, price: cost});
    console.log(cartItems);
}

function showCart(){
    cartMenu = !(cartMenu);
    document.querySelector("#cartDiv").classList.toggle("cartOpen");
    if(cartMenu){
        setTimeout(function(){ document.body.classList.toggle("menuOpen"); }, 300);
    } else{
        document.body.classList.toggle("menuOpen");
    }
}