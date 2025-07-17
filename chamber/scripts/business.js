const url = './data/members.json';
const spotlightsContainer = document.querySelector('#spotlightsContainer');

async function getBusiness() {
    const response = await fetch(url);
    const data = await response.json();
    displayBusiness(data.businesses);
}

const displayBusiness = (businesses) => {
    businesses.forEach((business) => {
        let div = document.createElement('div');
        div.classList.add('business-card');
        div.innerHTML = `
            <h3>${business.name}</h3>
            <p>${business.tagline}</p>
            <hr>
            <picture>
                <img src="${business.image}" alt="${business.name}" loading="lazy">
            </picture>
            <p><b>ADDRESS:</b> ${business.address}</p>
            <p><b>PHONE:</b> ${business.phone}</p>
            <p><b>URL:</b> ${business.website}</p>
            <p><b>MEMBERSHIP LEVEL:</b> ${business.membershipLevel}</p>
        `

        spotlightsContainer.appendChild(div);

    });
}

getBusiness();