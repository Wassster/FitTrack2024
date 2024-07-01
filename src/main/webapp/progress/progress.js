document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('myChart').getContext('2d');
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');

    fetch("/api/workout", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${window.sessionStorage.getItem("myJWT")}`
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
        })
        .then(data => {
            console.log(data);
            newChart(data);
            newChart1(data);
            newChart2(data);
        })
        .catch(error => {
            console.error("Error fetching profile:", error);
        });

    function newChart(data) {
        const exerciseMap = new Map();

        data.forEach(workout => {
            workout.exercises.forEach(exercise => {
                const exerciseName = exercise.name;
                const exerciseReps = parseInt(exercise.reps, 10);

                if (!exerciseMap.has(exerciseName)) {
                    exerciseMap.set(exerciseName, 0);
                }
                exerciseMap.set(exerciseName, exerciseMap.get(exerciseName) + exerciseReps);
            });
        });

        const exerciseNames = Array.from(exerciseMap.keys());
        const totalReps = Array.from(exerciseMap.values());

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: exerciseNames,
                datasets: [{
                    label: 'Total Reps',
                    data: totalReps,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            color: 'white'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'white'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }


    function newChart1(data) {
        const workoutNames = data.map(workout => workout.workoutName);
        const exerciseCounts = data.map(workout => workout.exercises.length);

        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: workoutNames,
                datasets: [{
                    label: 'Number of Exercises',
                    data: exerciseCounts,
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }

    function newChart2(data) {
        const exerciseNames = data.flatMap(workout => workout.exercises.map(exercise => exercise.name));
        const exerciseWeights = data.flatMap(workout => workout.exercises.map(exercise => exercise.weight));

        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: exerciseNames,
                datasets: [{
                    label: 'Weight',
                    data: exerciseWeights,
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }
});
