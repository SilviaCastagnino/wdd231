document.addEventListener('DOMContentLoaded', function () {
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            technology: ['C#'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    const courseContainer = document.getElementById('course-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCount = document.getElementById('course-count');
    const creditTotal = document.getElementById('credit-total');

    function displayCourses(filter = 'all') {
        courseContainer.innerHTML = '';

        const filteredCourses = courses.filter(course => {
            if (filter === 'all') return true;
            return course.subject === filter;
        });

        let totalCredits = 0;

        filteredCourses.forEach(course => {
            totalCredits += course.credits;

            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
            courseCard.innerHTML = `
                <div class="course-code">${course.subject}${course.number}</div>
                <div class="course-title">${course.title}</div>
                <div class="course-tech">Technologies: ${course.technology.join(', ')}</div>
                <div class="course-credits">${course.credits} credits</div>
                <div class="course-status">${course.completed ? '✓ Completed' : 'In Progress'}</div>
            `;
            courseContainer.appendChild(courseCard);
        });

        courseCount.textContent = `The total number of courses listed below is ${filteredCourses.length}`;
        creditTotal.textContent = `Total credits: ${totalCredits}`;
    }

    displayCourses();

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            displayCourses(this.dataset.filter);
        });
    });
});