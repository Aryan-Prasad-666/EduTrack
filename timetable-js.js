document.addEventListener('DOMContentLoaded', function() {
    const timetableContainer = document.getElementById('timetableContainer');
    const calendarInput = document.getElementById('calendarInput'); // Updated ID for the calendar input
    const calendarToggle = document.getElementById('calendarToggle'); // Updated ID for the calendar toggle button
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    
    // Example timetable data
    const timetable = [
        { time: '08:00 AM - 09:00 AM', subject: 'Mathematics' },
        { time: '09:00 AM - 10:00 AM', subject: 'Artificial Intelligence Project' },
        { time: '10:00 AM - 11:00 AM', subject: 'Exercise' },
        { time: '11:00 AM - 12:00 PM', subject: 'Python' },
        { time: '01:00 PM - 02:00 PM', subject: 'Java' },
        { time: '02:00 PM - 03:00 PM', subject: 'Assignment' }
    ];

    let completedTasks = 0;
    const totalTasks = timetable.length;

    function renderTimetable() {
        timetableContainer.innerHTML = '';
        timetable.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'timetable-entry';
            entryDiv.innerHTML = `
                <p><strong>${entry.time}</strong></p>
                <p class="subject">${entry.subject}</p>
                <button class="task-done-button" data-index="${index}">Task Done</button>
            `;
            timetableContainer.appendChild(entryDiv);
        });
    }

    function renderCalendar() {
        // Initialize the Pikaday calendar with the same configuration as the dashboard
        const picker = new Pikaday({
            field: calendarInput,
            format: 'D MMM YYYY',
            onSelect: function(date) {
                console.log(date.toDateString());
                // Update timetable based on selected date
                // For example, you can filter or fetch timetable data for the selected date
            },
            theme: 'dark-theme', // Assuming a theme is set in the dashboard Pikaday initialization
            // Add other configuration options as used in the dashboard
        });

        // Add click event to toggle calendar
        calendarToggle.addEventListener('click', () => {
            picker.show();
        });

        // Adjust the positioning of the calendar when closing it
        calendarInput.addEventListener('blur', () => {
            picker.hide();
        });
    }

    function updateProgressBar() {
        const percentage = (completedTasks / totalTasks) * 100;
        progressBar.style.width = percentage + '%';
        progressPercentage.textContent = Math.round(percentage) + '%';

        // Check if all tasks are completed and show an alert
        if (completedTasks === totalTasks) {
            alert('Congratulations! You have completed all tasks for today. 😊');
        }
    }

    function handleTaskCompletion() {
        timetableContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('task-done-button')) {
                const index = event.target.getAttribute('data-index');
                const subjectElement = event.target.previousElementSibling;
                
                // Toggle task completion
                if (event.target.classList.contains('completed')) {
                    event.target.classList.remove('completed');
                    subjectElement.classList.remove('task-done');
                    completedTasks--;
                } else {
                    event.target.classList.add('completed');
                    subjectElement.classList.add('task-done');
                    completedTasks++;
                }
                updateProgressBar();
            }
        });
    }

    renderTimetable();
    renderCalendar();
    handleTaskCompletion();
});
