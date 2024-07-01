document.addEventListener("DOMContentLoaded", function () {
    function profile(event) {
        event.preventDefault();


        let formData = new FormData(document.querySelector("#profileForm"));
        let jsonRequestBody = {};
        formData.forEach((value, key) => {
            jsonRequestBody[key] = value;
        });

        console.log("JSON Request Body:", JSON.stringify(jsonRequestBody));

        fetch("/api/Profile", {
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
                        throw new Error(text);
                    });
                }
            })
            .then(myJson => {
                window.location.href = '../dashboard/dashboard.html';
            })
            .catch(error => {
                console.log("Error:", error.message);
            });
    }

    const profileForm = document.querySelector("#profileForm");
    if (profileForm) {
        profileForm.addEventListener("submit", profile);
    } else {
        console.error("profileForm not found");
    }
});
