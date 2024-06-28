document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById('calendar');
    const monthDisplay = document.getElementById('monthDisplay');
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');

    let nav = 0;
    let clicked = null;
    const events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    function load() {
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        monthDisplay.innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

        calendar.innerHTML = '';

        for(let i = 1; i <= paddingDays + daysInMonth; i++) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');

            const dayString = `${month + 1}/${i - paddingDays}/${year}`;

            if (i > paddingDays) {
                daySquare.innerText = i - paddingDays;
                const eventForDay = events.find(e => e.date === dayString);

                if (eventForDay) {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    eventDiv.innerText = eventForDay.title;
                    daySquare.appendChild(eventDiv);
                }

                daySquare.addEventListener('click', () => openModal(dayString));
            } else {
                daySquare.classList.add('padding');
            }

            calendar.appendChild(daySquare);
        }
    }

    function openModal(date) {
        clicked = date;

        const eventForDay = events.find(e => e.date === clicked);

        if (eventForDay) {
            document.getElementById('eventText').innerText = eventForDay.title;
            document.getElementById('deleteEventModal').style.display = 'block';
        } else {
            document.getElementById('newEventModal').style.display = 'block';
        }

        document.getElementById('modalBackDrop').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('eventTitleInput').classList.remove('error');
        document.getElementById('newEventModal').style.display = 'none';
        document.getElementById('deleteEventModal').style.display = 'none';
        document.getElementById('modalBackDrop').style.display = 'none';
        document.getElementById('eventTitleInput').value = '';
        clicked = null;
        load();
    }

    function saveEvent() {
        if (document.getElementById('eventTitleInput').value) {
            document.getElementById('eventTitleInput').classList.remove('error');

            events.push({
                date: clicked,
                title: document.getElementById('eventTitleInput').value,
            });

            localStorage.setItem('events', JSON.stringify(events));
            closeModal();
        } else {
            document.getElementById('eventTitleInput').classList.add('error');
        }
    }

    function deleteEvent() {
        events.splice(events.findIndex(e => e.date === clicked), 1);
        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    }

    backButton.addEventListener('click', () => {
        nav--;
        load();
    });

    nextButton.addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);

    load();
});
