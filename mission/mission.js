const themeSelector = document.querySelector("#Theme"); 

function changeTheme() {
    if (themeSelector.value === "dark") {
        
        document.body.classList.remove("light");
        document.body.classList.add("dark");

        
        const logo = document.querySelector(".logo");
        if (logo) {
            logo.src = "byui-logo_white.png";
        }
    } else {
        
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        
        const logo = document.querySelector(".logo");
        if (logo) {
            logo.src = "byui-logo_blue.webp"; 
        }
    }
}

themeSelector.addEventListener("change", changeTheme);