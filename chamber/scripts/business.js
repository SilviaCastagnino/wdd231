const url = './data/members.json';
const spotlightsContainer = document.querySelector('#spotlightsContainer');
const ROTATION_INTERVAL = 5000;
const BUSINESSES_TO_SHOW = 3;
let businessData = [];
let lastShownIndices = [];

async function getBusiness() {
    const response = await fetch(url);
    const data = await response.json();

    businessData = data.businesses.filter(business =>
        ['Gold', 'Silver'].includes(business.membershipLevel)
    );

    if (businessData.length < BUSINESSES_TO_SHOW) {
        console.warn(`Not enough Gold/Silver members (${businessData.length}). Showing all available.`);
    }

    showRandomBusinesses();
    setInterval(showRandomBusinesses, ROTATION_INTERVAL);
}

function getUniqueRandomBusinesses() {
    if (businessData.length <= BUSINESSES_TO_SHOW) {
        return businessData;
    }

    const availableIndices = businessData
        .map((_, index) => index)
        .filter(index => !lastShownIndices.includes(index));

    if (availableIndices.length < BUSINESSES_TO_SHOW) {
        lastShownIndices = [];
        return getUniqueRandomBusinesses();
    }

    const shuffled = [...availableIndices].sort(() => 0.5 - Math.random());
    const selectedIndices = shuffled.slice(0, BUSINESSES_TO_SHOW);

    lastShownIndices = selectedIndices;
    return selectedIndices.map(index => businessData[index]);
}

function showRandomBusinesses() {
    spotlightsContainer.style.opacity = '0';

    setTimeout(() => {
        spotlightsContainer.innerHTML = '';

        const selectedBusinesses = getUniqueRandomBusinesses();

        const currentTheme = document.body.getAttribute('data-theme');

        let goldBg, goldColor, silverBg, silverColor;

        if (currentTheme === 'dark') {
            goldBg = '#FFD700';
            goldColor = '#333333';
            silverBg = '#A0A0A0';
            silverColor = '#000000';
        } else {
            goldBg = '#ffd700';
            goldColor = '#000';
            silverBg = '#c0c0c0';
            silverColor = '#000';
        }


        const tempMeasurements = selectedBusinesses.map(business => {
            const tempCard = document.createElement('div');
            tempCard.className = 'business-card';
            tempCard.style.position = 'absolute';
            tempCard.style.visibility = 'hidden';
            tempCard.innerHTML = `
                <div class="card-content">
                    <h3>${business.name}</h3>
                    <p>${business.tagline}</p>
                    <hr>
                    <picture>
                        <img src="${business.image}" alt="${business.name}" loading="lazy">
                    </picture>
                    <p><b>ADDRESS:</b> ${business.address}</p>
                    <p><b>PHONE:</b> ${business.phone}</p>
                    <p><b>WEBSITE:</b> <a href="https://${business.website}" target="_blank">${business.website}</a></p>
                </div>
            `;
            document.body.appendChild(tempCard);
            const contentHeight = tempCard.offsetHeight;
            document.body.removeChild(tempCard);
            return { business, contentHeight };
        });


        const maxContentHeight = Math.max(...tempMeasurements.map(m => m.contentHeight));
        const idealCardHeight = maxContentHeight + 60;


        tempMeasurements.forEach(({ business, contentHeight }) => {
            const card = document.createElement('div');
            card.className = 'business-card';
            card.style.minHeight = `${idealCardHeight}px`;
            card.style.display = 'flex';
            card.style.flexDirection = 'column';

            let badgeBg, badgeColor;
            if (business.membershipLevel === 'Gold') {
                badgeBg = goldBg;
                badgeColor = goldColor;
            } else {
                badgeBg = silverBg;
                badgeColor = silverColor;
            }

            card.innerHTML = `
                <div class="card-content" style="flex: 1; ${contentHeight < maxContentHeight ? 'padding-bottom: ' + (maxContentHeight - contentHeight) + 'px' : ''}">
                    <h3>${business.name}</h3>
                    <p>${business.tagline}</p>
                    <hr>
                    <picture>
                        <img src="${business.image}" alt="${business.name}" loading="lazy">
                    </picture>
                    <p><b>ADDRESS:</b> ${business.address}</p>
                    <p><b>PHONE:</b> ${business.phone}</p>
                    <p><b>WEBSITE:</b> <a href="https://${business.website}" target="_blank">${business.website}</a></p>
                </div>
                
                <div class="membership-badge" style="
                    background: ${badgeBg}; 
                    color: ${badgeColor};  
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: bold;
                    text-align: center;
                    margin-top: 20px;
                    margin-bottom: 10px;
                    align-self: center;
                    width: fit-content;
                ">
                    ${business.membershipLevel} MEMBER
                </div>
            `;

            spotlightsContainer.appendChild(card);
        });

        spotlightsContainer.style.opacity = '1';
    }, 500);
}

getBusiness();