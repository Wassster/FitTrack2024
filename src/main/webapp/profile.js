function profile(event) {
    const token = window.sessionStorage.getItem("Jwt");

    let formData = new FormData(document.querySelector("#profileForm"));
    let jsonRequestBody = {};
    formData.forEach((value, key) => {
        jsonRequestBody[key] = value;
    });

    console.log("JSON Request Body:", JSON.stringify(jsonRequestBody));

    fetch("/api/Profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(jsonRequestBody)
    })
        .then(response => {
            console.log("hier")
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
            window.location.href = './dashboard.html';
        })
        .catch(error => {
            console.log("Error:", error.message);
        });
}

document.querySelector("#profileForm").addEventListener("submit", profile);
