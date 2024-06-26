document.addEventListener('DOMContentLoaded', () => {
    const addExerciseButton = document.getElementById('addExercise');
    const exerciseContainer = document.getElementById('exerciseContainer');
    let isAddingExercise = false;

    let clickCounter = 0;
    const clickLimit = 11;

    addExerciseButton.addEventListener('click', () => {
        if (!isAddingExercise && clickCounter < clickLimit) {
            isAddingExercise = true;

            const newExerciseGroup = document.createElement('div');
            newExerciseGroup.classList.add('input-group');
            newExerciseGroup.innerHTML = `
                <div class="input">
                    <input type="text" placeholder="Name" name="name" required />
                </div>
                <div class="input">
                    <input type="number" placeholder="Weight" name="weight">
                </div>
                <div class="input">
                    <input type="number" placeholder="Reps" name="reps">
                </div>
                <div class="input">
                    <input type="number" placeholder="Sets" name="sets">
                </div>
            `;
            exerciseContainer.appendChild(newExerciseGroup);


            clickCounter++;


            setTimeout(() => {
                isAddingExercise = false;
                if (clickCounter >= clickLimit) {
                    addExerciseButton.disabled = true;
                }
            }, 100);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    function addWorkout(event) {
        event.preventDefault();


        let formData = new FormData(document.querySelector("#workoutForm"));
        let jsonRequestBody = {};
        formData.forEach((value, key) => {
            jsonRequestBody[key] = value;
        });

        console.log("JSON Request Body:", JSON.stringify(jsonRequestBody));

        fetch("/api/workout", {
            method: "POST",
            headers: {
                "AUTHORIZATION": `Bearer`+ window.sessionStorage.getItem("myJWT"),
                "Content-Type": "application/json"

            },
            body: JSON.stringify(jsonRequestBody)
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    return response.text().then(text => {
                        console.log("Response text on error:", text);
                        throw new Error(text);
                    });
                }
            })
            .catch(error => {
                console.log("Error:", error.message);
            });
    }

    const workoutForm = document.querySelector("#workoutForm");
    if (workoutForm) {
        workoutForm.addEventListener("submit", addWorkout);
    } else {
        console.error("profileForm element not found!");
    }});
