async function loadPlaces() {
    try {
        const response = await fetch('data/places.json');
        const data = await response.json();
        displayPlaces(data.places);
    } catch (error) {
        console.error('Error loading places:', error);
    }
}

function displayPlaces(places) {
    const container = document.getElementById('places-container');

    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'place-card animated-card';

        card.innerHTML = `
            <figure>
                <img src="images/${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
                <figcaption>
                    <h2>${place.name}</h2>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <a href="${place.link}" class="learn-more-btn" target="_blank">Learn More</a>
                </figcaption>
            </figure>
        `;

        container.appendChild(card);
    });
}

function trackVisits() {
    const now = new Date();
    const lastVisit = localStorage.getItem('lastVisit');
    const visitMessage = document.getElementById('visit-message');

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDiff = now - lastVisitDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', now.getTime().toString());
}

function init() {
    loadPlaces();
    trackVisits();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animated-card').forEach(card => {
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', init);