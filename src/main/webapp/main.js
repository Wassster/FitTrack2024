document.addEventListener("DOMContentLoaded", () => {

    function Reg(event) {
        event.preventDefault();

        let formData = new FormData(document.querySelector("#loginForm"));
        let jsonRequestBody = {};
        formData.forEach((value, key) => {
            jsonRequestBody[key] = value;
        });

        console.log("JSON Request Body:", jsonRequestBody);

        fetch("api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonRequestBody)
        })
            .then(response => {
                console.log("Response status:", response.status);
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(text => {
                        console.log("Response text on error:", text);
                        throw new Error(text);
                    });
                }
            })
            .then(myJson => {
                console.log("Response JSON:", myJson);
                // JWT-token opslaan in sessionStorage
                window.sessionStorage.setItem("myJWT", myJson.Jwt);
                // Doorsturen naar de profielpagina
                window.location.href = './dashboard.html';
            })
            .catch(error => {
                console.log("Error:", error.message);
            });
    }

    document.querySelector("#loginForm").addEventListener("submit", Reg);
});

