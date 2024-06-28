
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
                "AUTHORIZATION": `Bearer`+ window.sessionStorage.getItem("myJWT"),
                "Content-Type": "application/json"

            },
            body: JSON.stringify(jsonRequestBody)
        })
            .then(response => {
                if (response.ok) {
                    console.log("has been updated")
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

    const profileForm = document.querySelector("#profileeditForm");
    if (profileForm) {
        profileForm.addEventListener("submit", profileedit);
    } else {
        console.error("profileForm element not found!");
    }
});

