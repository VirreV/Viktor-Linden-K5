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
        if(document.getElementById("wrongInlog") == null){
            let wrongEl = document.createElement("div");
            wrongEl.innerHTML = "Fel användarnamn eller lösenord";
            wrongEl.id = "wrongInlog";
            document.querySelector("fieldset").appendChild(wrongEl);
        }
    } 
    else if(login){
        loginSuccess(user, jsonId);
    }

    return false;
});

function loginSuccess(user, jsonId){
    let bodyEl = document.querySelector("body");
    bodyEl.id = "shopItemForm";
    bodyEl.removeChild(document.querySelector("form"));
    let formEl = document.createElement("form");
    formEl.autocomplete = "off";
    let legend = document.createElement("legend");
    legend.innerHTML = "Add new item";
    let welcomeMessage = document.createElement("h2");
    welcomeMessage.innerHTML = "Welcome " + user + "!<br>Add new item or remove an old item below!";
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
    let logOutBtn = document.createElement("button");
    logOutBtn.type = "button";
    logOutBtn.innerHTML = "Log out";
    logOutBtn.id = "logOutBtn";
    logOutBtn.addEventListener("click", () => {location.reload();})
    let a = document.createElement("a");
    a.setAttribute("href", "index.html");
    a.innerHTML = "Back to home page";
    a.id = "backToHomeBtn";
    let addOrRemoveDiv = document.createElement("div");
    addOrRemoveDiv.id = "fieldsetContainer";

    let legend2 = document.createElement("legend");
    legend2.innerHTML = "Remove item";
    let removeShopItemForm = document.createElement("fieldset");
    let removeList = document.createElement("ul");
    removeList.id = "removeList";

    let list = JSON.parse(localStorage.getItem("myList"));
    if(list == null){
        localStorage.setItem("myList", JSON.stringify("[]"));
        list = JSON.parse(localStorage.getItem("myList"));
    }

    removeListFnc();

    function removeListFnc(){
        for(let i = 0; i < list.length; i++){
            let removeListItem = document.createElement("li");
            removeListItem.innerHTML = list[i].name;
            removeListItem.addEventListener("click", el => {
                list.splice(i, 1);
                let jsonList = JSON.stringify(list);
                localStorage.setItem("myList", jsonList);
                while (document.querySelector("ul").firstChild){
                    document.querySelector("ul").removeChild(document.querySelector("ul").firstChild);
                }
                removeListFnc(list);
            });
            removeList.appendChild(removeListItem);
        }
    }
    removeShopItemForm.appendChild(removeList);
    removeShopItemForm.appendChild(legend2);
    addShopItemForm.appendChild(nameLabel);
    addShopItemForm.appendChild(itemName);
    addShopItemForm.appendChild(priceLabel);
    addShopItemForm.appendChild(itemPrice);
    addShopItemForm.appendChild(itemButton);
    addShopItemForm.appendChild(legend);
    addOrRemoveDiv.appendChild(addShopItemForm);
    addOrRemoveDiv.appendChild(removeShopItemForm);
    formEl.appendChild(addOrRemoveDiv);
    bodyEl.appendChild(welcomeMessage);
    bodyEl.appendChild(formEl);
    bodyEl.appendChild(logOutBtn);
    bodyEl.appendChild(a);
    document.querySelector("form").addEventListener("submit", el => {
        if(el.preventDefault) el.preventDefault();
        let itemName = el.target.querySelector("input[type=text]");
        let itemPrice = el.target.querySelector("input[type=number]");
    
        let newItem = {
            name : itemName.value,
            price : itemPrice.value
        };
    
        list.push(newItem);
        let jsonList = JSON.stringify(list);
        localStorage.setItem("myList", jsonList);

        let successfullDiv = document.createElement("div");
        successfullDiv.innerHTML = "Successfully added item";
        successfullDiv.id = "itemAdded";
        document.querySelector("fieldset").appendChild(successfullDiv);
        setTimeout(() => {
            successfullDiv.style.opacity = "0";
            setTimeout(() => {
                successfullDiv.parentNode.removeChild(successfullDiv);
            }, 1000);
        }, 2000);
        
        while (document.querySelector("ul").firstChild){
            document.querySelector("ul").removeChild(document.querySelector("ul").firstChild);
        }

        list = JSON.parse(localStorage.getItem("myList"));
        removeListFnc();
    });
}