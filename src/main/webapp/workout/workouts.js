document.addEventListener("DOMContentLoaded", function () {
    function addWorkout(event) {
        event.preventDefault();

        let formData = new FormData(document.querySelector("#workoutForm"));
        let jsonRequestBody = {
            workoutName: formData.get("workoutName"),
            exercises: []
        };

        let exerciseFields = document.querySelectorAll("#exerciseContainer .input-group");
        exerciseFields.forEach(group => {
            let exercise = {
                name: group.querySelector('input[name="name"]').value,
                weight: group.querySelector('input[name="weight"]').value,
                reps: group.querySelector('input[name="reps"]').value,
                sets: group.querySelector('input[name="sets"]').value
            };
            jsonRequestBody.exercises.push(exercise);
        });

        console.log("JSON Request Body:", JSON.stringify(jsonRequestBody));

        fetch("/api/workout", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem("myJWT")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonRequestBody)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Response status:", response.status);
                    return response.json;
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

    function addExerciseFields() {
        let exerciseContainer = document.querySelector("#exerciseContainer");
        let newExerciseGroup = document.createElement("div");
        newExerciseGroup.className = "input-group";
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
    }

    const workoutForm = document.querySelector("#workoutForm");
    if (workoutForm) {
        workoutForm.addEventListener("submit", addWorkout);
    } else {
        console.error("workoutForm element not found!");
    }

    const addExerciseButton = document.querySelector("#addExercise");
    if (addExerciseButton) {
        addExerciseButton.addEventListener("click", addExerciseFields);
    } else {
        console.error("addExercise button not found!");
    }
});
