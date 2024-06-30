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
                    document.querySelector("#workoutForm").reset();
                    document.querySelector("#exerciseContainer").innerHTML = "";
                    return response.json();
                } else {
                    return response.text().then(text => {
                        console.log("Response text on error:", text);
                        throw new Error(text);
                    });
                }
            })
            .then(data => {
                console.log("Workout added:", data);
                loadworkout();
            })
            .catch(error => {
                console.log("Error:", error.message);
            });
    }

    function addExerciseFields(name = '', weight = '', reps = '', sets = '') {
        let exerciseContainer = document.querySelector("#exerciseContainer");
        let newExerciseGroup = document.createElement("div");
        newExerciseGroup.className = "input-group";
        newExerciseGroup.innerHTML = `
            <div class="input">
                <input type="text" placeholder="Name" name="name" value="${name}" required />
            </div>
            <div class="input">
                <input type="number" placeholder="Weight" name="weight" value="${weight}">
            </div>
            <div class="input">
                <input type="number" placeholder="Reps" name="reps" value="${reps}">
            </div>
            <div class="input">
                <input type="number" placeholder="Sets" name="sets" value="${sets}">
            </div>
        `;
        exerciseContainer.appendChild(newExerciseGroup);

        count++;
        if (count >= 11) {
            addExerciseButton.disabled = true;
        }
    }

    function loadworkout() {
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
                let list = document.querySelector("#routineList");
                list.innerHTML = "";
                data.forEach(workout => {
                    let newExerciseGroup = document.createElement("li");
                    newExerciseGroup.textContent = workout.workoutName;
                    newExerciseGroup.addEventListener("click", () => getOldWorkout(workout));
                    list.appendChild(newExerciseGroup);
                });
            })
            .catch(error => {
                console.error("Error fetching profile:", error);
            });
    }

    function getOldWorkout(workout) {
        document.querySelector("#workoutForm input[name='workoutName']").value = workout.workoutName;
        document.querySelector("#exerciseContainer").innerHTML = "";

        workout.exercises.forEach(exercise => {
            addExerciseFields(exercise.name, exercise.weight, exercise.reps, exercise.sets);
        });

        count = workout.exercises.length;
        if (count >= 11) {
            addExerciseButton.disabled = true;
        } else {
            addExerciseButton.disabled = false;
        }
    }

    const workoutForm = document.querySelector("#workoutForm");
    if (workoutForm) {
        workoutForm.addEventListener("submit", addWorkout);
    } else {
        console.error("workoutForm element not found!");
    }

    let count = 0;
    const addExerciseButton = document.querySelector("#addExercise");
    if (addExerciseButton) {
        addExerciseButton.addEventListener("click", addExerciseFields);
    } else {
        console.error("addExerciseButton element not found!");
    }

    loadworkout();
});
