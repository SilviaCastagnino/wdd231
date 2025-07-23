document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const formDetailsDiv = document.getElementById('form-details');

    if (formDetailsDiv) {
        let detailsHtml = '<h3>Submitted Information:</h3><ul>';

        const requiredFields = {
            fname: "First Name",
            lname: "Last Name",
            email: "Email",
            phone: "Mobile Phone",
            bizname: "Business Name",
            timestamp: "Submission Time"
        };

        for (const [paramName, displayName] of Object.entries(requiredFields)) {
            if (urlParams.has(paramName)) {
                let value = urlParams.get(paramName);
                if (paramName === 'timestamp') {
                    try {
                        const date = new Date(value);
                        value = date.toLocaleString();
                    } catch (e) {
                        console.error("Invalid timestamp format:", value);
                    }
                }
                detailsHtml += `<li><strong>${displayName}:</strong> ${value}</li>`;
            }
        }
        detailsHtml += '</ul>';
        formDetailsDiv.innerHTML = detailsHtml;
    }
});