const ctx = document.getElementById('myChart');


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
        console.log(data)
        newChart(data,)
    })
    .catch(error => {
        console.error("Error fetching profile:", error);
    });


function newChart(data){
    data.forEach(workout => {
        const exerciseNames = workout.exercises.map(exercise => exercise.name);
        const exerciseWeight = workout.exercises.map(exercise => exercise.weight);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: exerciseNames,
            datasets: [{
                label: 'weight',
                data: exerciseWeight,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });})}

