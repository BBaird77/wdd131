function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    if (menuContent.style.display === 'flex') {
        menuContent.style.display = 'none';
    } else {
        menuContent.style.display = 'flex';
        menuContent.style.flexDirection = 'column';
    }
}

function viewHandler(event) {
    const clickedImg = event.target;
    const imgSrc = clickedImg.getAttribute("src");
    const imgNameParts = imgSrc.split("-");
    const highResImage = imgNameParts[0] + "-full.jpeg";  

    const viewer = document.getElementById("imageviewer");

    if (viewer) {
        viewer.style.display = "flex";  
        document.getElementById("viewerImg").src = highResImage; 
    }
}

function closeViewer() {
    const viewer = document.getElementById("imageviewer");
    if (viewer) {
        viewer.style.display = "none";  
    }
}

document.querySelector(".closeviewer").addEventListener("click", closeViewer);

document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", viewHandler);
});

document.getElementById("imageviewer").addEventListener("click", function(event) {
    if (event.target === this) {
        closeViewer();
    }
});
