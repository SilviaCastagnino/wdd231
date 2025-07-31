document.addEventListener('DOMContentLoaded', () => {
    const tipsContainer = document.getElementById('dynamic-tips-container');
    const errorMessage = document.querySelector('.tips-section .error-message');
    const jsonFilePath = 'data/tips.json'; // Ensure this path is correct

    async function fetchTips() {
        try {
            const response = await fetch(jsonFilePath);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const tips = data.advice;

            tipsContainer.innerHTML = '';
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }

            if (tips && tips.length > 0) {
                tips.forEach(tip => {
                    const tipCard = document.createElement('div');
                    tipCard.classList.add('tip-card');
                    tipCard.innerHTML = `
                        <h3>${tip.title}</h3>
                        <p>${tip.description}</p>
                        <p><strong>Category:</strong> ${tip.category}</p>
                        <p><strong>Difficulty:</strong> ${tip.difficulty}</p>
                        <a href="${tip.link}" target="_blank" rel="noopener noreferrer" class="cta-button small-button">Learn More</a>
                    `;
                    tipsContainer.appendChild(tipCard);
                });
            } else {
                tipsContainer.innerHTML = '<p style="text-align: center;">No tips available at the moment.</p>';
            }

        } catch (error) {
            console.error('Error fetching tips:', error);
            tipsContainer.innerHTML = '';
            if (errorMessage) {
                errorMessage.style.display = 'block';
            }
        }
    }

    fetchTips();
});