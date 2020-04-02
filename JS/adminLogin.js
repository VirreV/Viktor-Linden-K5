let requestLogins = new XMLHttpRequest();
requestLogins.open("GET", "../DATA/login.json", false);
requestLogins.send(null);
let allLogin = JSON.parse(requestLogins.responseText);

document.querySelector("#loginForm").addEventListener("submit", el => {
    if(el.preventDefault) el.preventDefault();
    let unameEl = el.target.querySelector("input[type=text]");
    let passwordEl = el.target.querySelector("input[type=password]");

    let login = false;
    let user = "";
    let jsonId = 0;

    for(let i = 0; i < allLogin.length; i++){
        if(unameEl.value.toLowerCase() == allLogin[i].user.toLowerCase()){
            if(passwordEl.value == allLogin[i].pass){
                login = true;
                user = allLogin[i].user;
                jsonId = i;
            } else{
                break;
            }
        }
    }

    if(!(login)){
        let wrongEl = document.createElement("div");
        wrongEl.innerHTML = "Fel användarnamn eller lösenord";
        wrongEl.id = "wrongInlog";
        document.querySelector("fieldset").appendChild(wrongEl);
    } 
    else if(login){
        loginSuccess(user, jsonId);
    }

    return false;
});

function loginSuccess(user, jsonId){
    document.querySelector("#loginForm").removeEventListener("submit", el => {
        if(el.preventDefault) el.preventDefault();
        let unameEl = el.target.querySelector("input[type=text]");
        let passwordEl = el.target.querySelector("input[type=password]");
    
        let login = false;
        let user = "";
        let jsonId = 0;
    
        for(let i = 0; i < allLogin.length; i++){
            if(unameEl.value.toLowerCase() == allLogin[i].user.toLowerCase()){
                if(passwordEl.value == allLogin[i].pass){
                    login = true;
                    user = allLogin[i].user;
                    jsonId = i;
                } else{
                    break;
                }
            }
        }
    
        if(!(login)){
            let wrongEl = document.createElement("div");
            wrongEl.innerHTML = "Fel användarnamn eller lösenord";
            wrongEl.id = "wrongInlog";
            document.querySelector("fieldset").appendChild(wrongEl);
        } 
        else if(login){
            loginSuccess(user, jsonId);
        }
    
        return false;
    });

    let formEl = document.querySelector("form");
    formEl.removeChild(document.querySelector("fieldset"));
    let addShopItemForm = document.createElement("fieldset");
    let itemName = document.createElement("input");
    itemName.type = "text";
    itemName.placeholder = "Enter Name";
    itemName.name = "itemName";
    itemName.required = true;
    let nameLabel = document.createElement("label");
    nameLabel.innerHTML = "Name";
    nameLabel.for = "itemName";
    let priceLabel = document.createElement("label");
    priceLabel.innerHTML = "Price";
    priceLabel.for = "itemPrice";
    let itemPrice = document.createElement("input");
    itemPrice.type = "number";
    itemPrice.placeholder = "Enter Price";
    itemPrice.name = "itemPrice";
    itemPrice.required = true;
    let itemButton = document.createElement("button");
    itemButton.type = "submit";
    itemButton.id = "addShopItemBtn";
    itemButton.innerHTML = "Submit Item";

    addShopItemForm.appendChild(nameLabel);
    addShopItemForm.appendChild(itemName);
    addShopItemForm.appendChild(priceLabel);
    addShopItemForm.appendChild(itemPrice);
    addShopItemForm.appendChild(itemButton);
    formEl.id = "shopItemForm";
    formEl.appendChild(addShopItemForm);

    //Koden nedan var tänkt att lägga till object i json listan men fungerade ej, även require.js fanns tidigare av den anledningen men raderades pga alldeles för mycket onödig kod
    // formEl.addEventListener("submit", el => {
    //     if(el.preventDefault) el.preventDefault();
    //     let itemName = el.target.querySelector("input[type=text]");
    //     let itemPrice = el.target.querySelector("input[type=number]");
    
    //     let newItem = {
    //         "name" : itemName.value,
    //         "price" : itemPrice.value
    //     };
    
    //     let requestProducts = new XMLHttpRequest();
    //     requestProducts.open("GET", "../DATA/products.json", false);
    //     requestProducts.send(null);
    //     let allProducts = JSON.parse(requestProducts.responseText);

    //     allProducts.push(newItem);

    //     console.log(allProducts);

    //     let jsonList = JSON.stringify(allProducts);
    
    //     console.log(jsonList);

    //     require(['scripts/require.js'], function(fs){
    //         fs.writeFile("../DATA/products.json", jsonList, function(error) {
    //             if(error){
    //                 return console.log(error);
    //             }
    //             console.log("Success");
    //         });
    //     })

    //     let rewriteProducts = new XMLHttpRequest();
    //     rewriteProducts.open("GET", "../DATA/products.json", false);
    //     rewriteProducts.send(jsonList);
    // });
}