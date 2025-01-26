function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    if (menuContent.style.display === 'flex') {
        menuContent.style.display = 'none';
    } else {
        menuContent.style.display = 'flex';
        menuContent.style.flexDirection = 'column';
    }
}