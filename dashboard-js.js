document.addEventListener('DOMContentLoaded', function() {
    const assignments = [
        { name: 'Math Homework', dueDate: '2024-07-25' },
        { name: 'Science Project', dueDate: '2024-07-30' }
    ];
    const events = [
        { title: 'Math Homework Due', date: '2024-07-25' },
        { title: 'Science Project Due', date: '2024-07-30' },
        { title: 'Midterm Exam', date: '2024-08-10' }
    ];

    const sgpaInputsContainer = document.getElementById('sgpaInputs');
    const themeToggle = document.getElementById('themeToggle');

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.querySelectorAll('.card').forEach(card => card.classList.toggle('dark-mode'));
        document.querySelectorAll('button').forEach(button => button.classList.toggle('dark-mode'));
    });

    function createSGPAInputs() {
        sgpaInputsContainer.innerHTML = '';
        for (let i = 1; i <= 8; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `sgpa${i}`;
            input.placeholder = `SGPA Semester ${i}`;
            input.step = '0.01';
            input.min = '0';
            input.max = '10';
            input.className = 'hidden';

            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault(); 
                    updateGraphs(); 
                }
            });

            sgpaInputsContainer.appendChild(input);
        }
    }

    createSGPAInputs();

    const calendarInput = document.getElementById('calendarInput');
    const calendarToggle = document.getElementById('calendarToggle');
    const eventForm = document.getElementById('eventForm');
    const eventsList = document.getElementById('eventsList');

    let picker = new Pikaday({
        field: calendarInput,
        onSelect: function(date) {
            updateEvents(date);
        },
        format: 'YYYY-MM-DD',
        defaultDate: new Date(),
        setDefaultDate: true
    });

    calendarToggle.addEventListener('click', function() {
        picker.show();
    });

    document.getElementById('eventFormContent').addEventListener('submit', function(e) {
        e.preventDefault();
        const eventDate = document.getElementById('eventDate').value;
        const eventTitle = document.getElementById('eventTitle').value;
        const eventType = document.getElementById('eventType').value;
        
        const newEvent = { title: `${eventType}: ${eventTitle}`, date: eventDate };
        events.push(newEvent);
        updateEvents(new Date(eventDate));
        
        eventForm.classList.add('hidden');
    });

    document.getElementById('cancelButton').addEventListener('click', function() {
        eventForm.classList.add('hidden');
    });

    document.getElementById('addEventButton').addEventListener('click', function() {
        eventForm.classList.toggle('hidden');
    });

    document.getElementById('editGPAButton').addEventListener('click', function() {
        const semester = prompt('Which semester\'s SGPA do you want to add or update? (1-8)');
        const semesterNumber = parseInt(semester, 10);
        
        if (semesterNumber >= 1 && semesterNumber <= 8) {
            const sgpa = prompt('Enter the SGPA for semester ' + semesterNumber);
            const sgpaValue = parseFloat(sgpa);
            
            if (!isNaN(sgpaValue) && sgpaValue >= 0 && sgpaValue <= 10) {
                const sgpaInput = document.getElementById(`sgpa${semesterNumber}`);
                sgpaInput.value = sgpaValue.toFixed(2);
                sgpaInput.classList.remove('hidden'); 

                updateGraphs(); 
            } else {
                alert('Please enter a valid SGPA (0-10).');
            }
        } else {
            alert('Please enter a valid semester number (1-8).');
        }
    });

    function updateEvents(date) {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const filteredEvents = events.filter(event => event.date === formattedDate);
        
        eventsList.innerHTML = '';
        filteredEvents.forEach(event => {
            const listItem = document.createElement('li');
            listItem.textContent = event.title;
            eventsList.appendChild(listItem);
        });
    }

    function calculateCGPA() {
        const sgpas = Array.from(document.querySelectorAll('#sgpaInputs input'))
            .filter(input => !input.classList.contains('hidden')) 
            .map(input => parseFloat(input.value) || 0);
        
        if (sgpas.length > 0) {
            const totalSGPA = sgpas.reduce((sum, sgpa) => sum + sgpa, 0);
            const cgpa = (totalSGPA / sgpas.length).toFixed(2);
            document.getElementById('cgpa').textContent = cgpa;
            updateCGPAComparisonChart(cgpa, parseFloat(document.getElementById('targetCgpa').value) || 0);
        } else {
            document.getElementById('cgpa').textContent = 'N/A'; 
        }
    }

    function updateDisplayedSemesters() {
        const sgpaInputs = document.querySelectorAll('#sgpaInputs input');
        sgpaInputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('hidden');
            } else {
                input.classList.remove('hidden'); 
            }
        });
    }

    const sgpaComparisonCtx = document.getElementById('sgpaComparisonChart').getContext('2d');
    const cgpaComparisonCtx = document.getElementById('cgpaComparisonChart').getContext('2d');

    let sgpaComparisonChart;
    let cgpaComparisonChart;

    function initializeCharts() {
        sgpaComparisonChart = new Chart(sgpaComparisonCtx, {
            type: 'line',
            data: {
                labels: Array.from({ length: 8 }, (_, i) => `Sem ${i + 1}`),
                datasets: [{
                    label: 'SGPA',
                    data: Array(8).fill(0),
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });

        cgpaComparisonChart = new Chart(cgpaComparisonCtx, {
            type: 'bar',
            data: {
                labels: ['Current CGPA', 'Target CGPA'],
                datasets: [{
                    label: 'CGPA Comparison',
                    data: [0, 0],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.2)',
                        'rgba(231, 76, 60, 0.2)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(231, 76, 60, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }

    function updateSGPAComparisonChart() {
        const sgpas = Array.from(document.querySelectorAll('#sgpaInputs input'))
            .filter(input => !input.classList.contains('hidden'))
            .map(input => parseFloat(input.value) || 0);

        const labels = sgpas.map((_, index) => `Sem ${index + 1}`);
        
        sgpaComparisonChart.data.labels = labels;
        sgpaComparisonChart.data.datasets[0].data = sgpas;
        sgpaComparisonChart.update();
    }

    function updateCGPAComparisonChart(currentCGPA, targetCGPA) {
        cgpaComparisonChart.data.datasets[0].data = [currentCGPA, targetCGPA];
        cgpaComparisonChart.update();
    }

    document.getElementById('targetCgpa').addEventListener('input', function() {
        const currentCGPA = parseFloat(document.getElementById('cgpa').textContent) || 0;
        const targetCGPA = parseFloat(this.value) || 0;
        updateCGPAComparisonChart(currentCGPA, targetCGPA);
    });

    function addEnterKeyListenerToSGPAInputs() {
        const sgpaInputs = document.querySelectorAll('#sgpaInputs input');
        sgpaInputs.forEach(input => {
            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault(); 
                    updateGraphs(); 
                }
            });
        });
    }

    function updateGraphs() {
        updateDisplayedSemesters();
        calculateCGPA();
        updateSGPAComparisonChart();
    }

    initializeCharts();
    updateDisplayedSemesters();
    calculateCGPA();
    addEnterKeyListenerToSGPAInputs();
});
