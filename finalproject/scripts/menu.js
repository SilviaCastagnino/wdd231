document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mainNavigation = document.getElementById('main-navigation');
    const navContainer = mainNavigation ? mainNavigation.closest('nav') : null;

    if (menuButton && mainNavigation && navContainer) {
        menuButton.addEventListener('click', () => {
            const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !expanded);
            navContainer.classList.toggle('show');
            menuButton.classList.toggle('active');
        });
    } else {
        console.warn('Menu button or navigation not found. Check IDs in HTML and script paths.');
        if (!menuButton) console.warn('menuButton element not found.');
        if (!mainNavigation) console.warn('mainNavigation element not found.');
        if (!navContainer) console.warn('navContainer element not found.');
    }
});