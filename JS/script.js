let menu = false;
let darkMode = true;
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