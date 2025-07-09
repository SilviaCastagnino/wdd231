document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.textContent = '☀️'; // Sun icon for dark mode
        } else {
            themeToggle.textContent = '🌙'; // Moon icon for light mode
        }
    } else {
        // Default to light theme if no preference is saved
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});