document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const expanded = navLinks.classList.contains('active');
        hamburgerBtn.setAttribute('aria-expanded', expanded);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', false);
        });
    });
});