document.addEventListener("DOMContentLoaded", function () {
    const monthDisplay = document.getElementById("monthDisplay");
    const calendar = document.getElementById("calendar");
    const backButton = document.getElementById("backButton");
    const nextButton = document.getElementById("nextButton");
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

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
        calendar.innerHTML = "";

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
        const daysInMonth = lastDayOfMonth.getDate();

        for (let i = 0; i < firstDayOfWeek; i++) {
            const daySquare = document.createElement("div");
            daySquare.classList.add("padding");
            calendar.appendChild(daySquare);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const daySquare = document.createElement("div");
            daySquare.classList.add("day");
            daySquare.textContent = i;

            const dayString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;

            if (workouts[dayString]) {
                workouts[dayString].forEach(workout => {
                    const workoutDiv = document.createElement("div");
                    workoutDiv.classList.add("event");
                    workoutDiv.textContent = workout.workoutName;
                    daySquare.appendChild(workoutDiv);
                });
            }

            daySquare.addEventListener("click", () => {
                openModal(dayString, workouts[dayString] || []);
            });

            calendar.appendChild(daySquare);
        }
    }

    function updateMonthDisplay() {
        const options = { month: "long", year: "numeric" };
        const date = new Date(currentYear, currentMonth);
        monthDisplay.textContent = date.toLocaleDateString("en-US", options);
    }

    backButton.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateMonthDisplay();
        loadWorkouts();
    });

    nextButton.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateMonthDisplay();
        loadWorkouts();
    });

    function openModal(date, workouts) {
        alert(`Workouts on ${date}: ${workouts.map(w => w.workoutName).join(", ")}`);
    }

    updateMonthDisplay();
    loadWorkouts();
});
