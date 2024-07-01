let menu = document.getElementById("menu");

function toggleMenu(){
    menu.classList.toggle("open")
}

function logout(){
    window.sessionStorage.removeItem("myJWT")
    console.log("uitgelogd",window.sessionStorage.getItem("myJWT"))
}
