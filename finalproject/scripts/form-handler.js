export function setupFormHandler() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const data = {};

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            localStorage.setItem('lastFormData', JSON.stringify(data));
            console.log('Form data saved to Local Storage:', data);

            window.location.href = 'form-action.html';
        });
    } else {
        console.warn('Contact form with ID "contactForm" not found. Form submission will not be handled.');
    }
}

export function displayFormData() {
    const formDataDisplay = document.getElementById('formDataDisplay');

    if (formDataDisplay) {
        const storedData = localStorage.getItem('lastFormData');

        if (storedData) {
            const data = JSON.parse(storedData);
            let htmlContent = '<ul>';

            for (const key in data) {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                htmlContent += `<li><strong>${formattedKey}:</strong> ${data[key]}</li>`;
            }
            htmlContent += '</ul>';
            formDataDisplay.innerHTML = htmlContent;
            console.log('Form data displayed from Local Storage.');
        } else {
            formDataDisplay.innerHTML = '<p>No form data found. Please submit the <a href="contactus.html">contact form</a> first.</p>';
            console.log('No form data found in Local Storage.');
        }
    } else {
        console.warn('Element with ID "formDataDisplay" not found. Form data cannot be displayed.');
    }
}