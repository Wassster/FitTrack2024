document.addEventListener("DOMContentLoaded", function () {
    const monthDisplay = document.getElementById("monthDisplay");
    const calendar = document.getElementById("calendar");
    const backButton = document.getElementById("backButton");
    const nextButton = document.getElementById("nextButton");
    const weekdays = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag','zondag'];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let nav = 0;

    function loadWorkouts() {
        fetch("/api/calendar", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem("myJWT")}`
            }
        })
            .then(response => response.json())
            .then(data => {
                renderCalendar(data);
            })
            .catch(error => {
                console.error("Error fetching workouts:", error);
            });
    }

    function renderCalendar(workouts) {
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString('nl-NL', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        console.log('First Day of Month:', firstDayOfMonth);
        console.log('Date String:', dateString);

        const weekdayName = dateString.split(' ')[0];
        const paddingDays = weekdays.indexOf(weekdayName);

        console.log('Weekday Name:', weekdayName);
        console.log('Padding Days:', paddingDays);

        document.getElementById('monthDisplay').innerText =
            `${dt.toLocaleDateString('nl-NL', { month: 'long' })} ${year}`;

        calendar.innerHTML = '';

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');

            const dayNum = i - paddingDays;
            const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

            if (i > paddingDays) {
                daySquare.innerText = dayNum;

                if (dayNum === day && nav === 0) {
                    daySquare.id = 'currentDay';
                }

                const eventForDay = workouts[dayString];
                console.log(dayString, eventForDay);

                if (eventForDay) {
                    eventForDay.forEach(workout => {
                        const workoutDiv = document.createElement('div');
                        workoutDiv.classList.add('event');
                        workoutDiv.textContent = workout.workoutName;
                        daySquare.appendChild(workoutDiv);
                    });
                }

                daySquare.addEventListener('click', () => {
                    openModal(dayString, eventForDay || []);
                });
            }

            calendar.appendChild(daySquare);
        }
    }

    function updateMonthDisplay() {
        const options = { month: 'long', year: 'numeric' };
        const date = new Date(currentYear, currentMonth);
        monthDisplay.textContent = date.toLocaleDateString('nl-NL', options);
    }

    backButton.addEventListener('click', () => {
        nav--;
        updateMonthDisplay();
        loadWorkouts();
    });

    nextButton.addEventListener('click', () => {
        nav++;
        updateMonthDisplay();
        loadWorkouts();
    });

    function openModal(date, workouts) {
        const modal = document.getElementById('workoutModal');
        const workoutDetails = document.getElementById('workoutDetails');

        workoutDetails.innerHTML = '';

        workouts.forEach(workout => {
            const workoutDiv = document.createElement('div');
            workoutDiv.classList.add('workout-detail');
            workoutDiv.innerHTML = `
            <h3>${workout.workoutName}</h3>
            <p>Date: ${date}</p>
            <ul>
                ${workout.exercises.map(exercise => `
                    <li>
                        <strong>${exercise.name}</strong><br>
                        Weight: ${exercise.weight} kg<br>
                        Reps: ${exercise.reps}<br>
                        Sets: ${exercise.sets}
                    </li>
                `).join('')}
            </ul>
        `;
            workoutDetails.appendChild(workoutDiv);
        });

        modal.style.display = 'block';
        document.getElementById('modalBackDrop').style.display = 'block';
    }

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('workoutModal').style.display = 'none';
        document.getElementById('modalBackDrop').style.display = 'none';
    });

    updateMonthDisplay();
    loadWorkouts();
});

