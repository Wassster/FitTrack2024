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
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(text => {
                        alert("Login Failed")
                        throw new Error(text);
                    });
                }
            })
            .then(myJson => {
                console.log("Response JSON:", myJson);

                window.sessionStorage.setItem("myJWT", myJson.Jwt);

                window.location.href = 'dashboard/dashboard.html';
            })
            .catch(error => {
                console.log("Error:", error.message);
            });
    }

    document.querySelector("#loginForm").addEventListener("submit", Reg);
});

