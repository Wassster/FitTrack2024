document.addEventListener("DOMContentLoaded", () => {

    function register(event) {
        event.preventDefault();

        let formData = new FormData(document.querySelector("#regisForm"));
        let jsonRequestBody = {};
        formData.forEach((value, key) => {
            jsonRequestBody[key] = value;
        });

        console.log("JSON Request Body:", jsonRequestBody);

        fetch("api/login/Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonRequestBody)
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
            .then(myJson => {
                console.log("Response JSON:", myJson);

                window.sessionStorage.setItem("myJWT", myJson.Jwt);

                console.log(myJson.Jwt)

                window.location.href = 'profile/createProfile.html';
            })
            .catch(error => {
                console.log("Error:", error.message);
            });
    }

    document.querySelector("#regisForm").addEventListener("submit",register );
});