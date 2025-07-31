document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalButton = document.querySelector('.close-modal-button');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const learnMoreButtons = document.querySelectorAll('.learn-more-button');

    const modalContents = {
        'frontend-modal': {
            title: 'Master Front-End Development',
            description: `
                <p>Front-end development focuses on everything a user sees and interacts with in their browser. It's the art of transforming design into interactive web experiences.</p>
                <p>Key technologies include:</p>
                <ul>
                    <li><strong>HTML (HyperText Markup Language):</strong> The structure of web pages.</li>
                    <li><strong>CSS (Cascading Style Sheets):</strong> Controls the visual presentation, layout, and styling.</li>
                    <li><strong>JavaScript:</strong> Adds interactivity, dynamic behavior, and complex functionalities to web pages.</li>
                </ul>
                <p>Advanced topics often involve JavaScript frameworks/libraries like React, Vue, or Angular, which streamline the creation of complex user interfaces, as well as understanding UI/UX principles for intuitive and accessible designs.</p>
            `
        },
        'backend-modal': {
            title: 'Dive into Back-End Basics',
            description: `
                <p>Back-end development deals with the 'behind-the-scenes' logic of web applications, managing databases, servers, and APIs. It's the engine that powers the front-end.</p>
                <p>Core components typically include:</p>
                <ul>
                    <li><strong>Server-Side Languages:</strong> Such as Node.js (JavaScript), Python, PHP, Ruby, Java, or C#.</li>
                    <li><strong>Databases:</strong> Systems for storing and retrieving data, like SQL (e.g., PostgreSQL, MySQL) or NoSQL (e.g., MongoDB, Cassandra).</li>
                    <li><strong>APIs (Application Programming Interfaces):</strong> Define how different software components should interact, often used for data exchange between front-end and back-end.</li>
                </ul>
                <p>Back-end developers are responsible for business logic, data storage, security, and ensuring high performance and scalability of the server-side infrastructure.</p>
            `
        },
        'security-modal': {
            title: 'Understand Web Security Fundamentals',
            description: `
                <p>Web security is crucial for protecting web applications from cyber threats and safeguarding user data. It involves implementing measures to prevent unauthorized access, data breaches, and malicious attacks.</p>
                <p>Fundamental areas include:</p>
                <ul>
                    <li><strong>Authentication:</strong> Verifying user identity (e.g., passwords, multi-factor authentication).</li>
                    <li><strong>Authorization:</strong> Determining what an authenticated user is allowed to do.</li>
                    <li><strong>Input Validation:</strong> Preventing common vulnerabilities like Cross-Site Scripting (XSS) and SQL Injection by sanitizing user inputs.</li>
                    <li><strong>Secure Communication:</strong> Using HTTPS to encrypt data in transit.</li>
                    <li><strong>Understanding Common Vulnerabilities:</strong> Familiarizing oneself with the OWASP Top 10 list of critical security risks.</li>
                </ul>
                <p>Building secure applications requires a proactive mindset, regular security updates, and adherence to best practices throughout the development lifecycle.</p>
            `
        }
    };

    function openModal(modalId) {
        const content = modalContents[modalId];
        if (content) {
            modalTitle.textContent = content.title;
            modalBody.innerHTML = content.description;
            modalOverlay.classList.add('show-modal');
            modalOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        modalOverlay.classList.remove('show-modal');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const modalTargetId = event.target.dataset.modalTarget;
            openModal(modalTargetId);
        });
    });

    closeModalButton.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('show-modal')) {
            closeModal();
        }
    });
});