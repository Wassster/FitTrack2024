document.addEventListener("DOMContentLoaded", function () {
    function profileedit(event) {
        event.preventDefault();

        let formData = new FormData(document.querySelector("#profileeditForm"));
        let jsonRequestBody = {};
        formData.forEach((value, key) => {
            jsonRequestBody[key] = value;
        });

        console.log("JSON Request Body:", JSON.stringify(jsonRequestBody));

        fetch("/api/Profile/edit", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem("myJWT")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonRequestBody)
        })
            .then(response => {
                if (response.ok) {
                    alert("Profile has been updated");
                    return response;
                } else {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
            })
            .catch(error => {
                console.log("Error:", error.message);
            });
    }

    const profileForm = document.querySelector("#profileeditForm");
    if (profileForm) {
        profileForm.addEventListener("submit", profileedit);
    } else {
        console.error("profileForm element not found!");
    }

    function loadprofile() {
        fetch("/api/Profile/edit", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem("myJWT")}`
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                document.getElementById('name').value = data.name;
                document.getElementById('gender').value = data.gender;
                document.getElementById('height').value = data.height;
                document.getElementById('weight').value = data.weight;
            })
            .catch(error => {
                console.error("Error", error);
            });
    }


    loadprofile();
});
