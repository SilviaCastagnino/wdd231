document.addEventListener('DOMContentLoaded', function () {

    const singleColumnBtn = document.getElementById('singleColumn');
    const threeColumnsBtn = document.getElementById('threeColumns');
    const spotlightsContainer = document.getElementById('spotlightsContainer');

    setLayout('threeColumns');

    singleColumnBtn.addEventListener('click', () => setLayout('singleColumn'));
    threeColumnsBtn.addEventListener('click', () => setLayout('threeColumns'));

    function setLayout(layoutType) {
        spotlightsContainer.classList.remove('single-column', 'three-columns');
        if (layoutType === 'singleColumn') {
            spotlightsContainer.classList.add('single-column');
            singleColumnBtn.classList.add('active');
            threeColumnsBtn.classList.remove('active');
        } else {
            spotlightsContainer.classList.add('three-columns');
            threeColumnsBtn.classList.add('active');
            singleColumnBtn.classList.remove('active');
        }
    }

    loadBusinesses();
});

async function loadBusinesses() {
    try {
        const response = await fetch('./data/members.json');
        const data = await response.json();
        renderBusinesses(data.businesses);
    } catch (error) {
        console.error('Error loading businesses:', error);
        renderBusinesses([
        ]);
    }
}

function renderBusinesses(businesses) {
    const container = document.getElementById('spotlightsContainer');
    container.innerHTML = '';

    businesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.innerHTML = `
            <h3>${business.name}</h3>
            <img src="${business.image}" alt="${business.name}" loading="lazy">
            <p><strong>Address:</strong> ${business.address}</p>
            <p><strong>Phone:</strong> ${business.phone}</p>
            <p><strong>Website:</strong> <a href="${business.website}" target="_blank">Visit</a></p>
            <p class="membership">${business.membershipLevel} Member</p>
        `;
        container.appendChild(card);
    });
}