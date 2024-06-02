document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    })
        .then((response) => response.text())
        .then((data) => {
            if (data === "login succesvol") {
                window.location.href = "createProfile.html";
            } else {
                alert('Onjuiste invoer of account niet bekend, probeer het opnieuw alsjeblieft.');
                document.querySelector('form').reset();
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("message").textContent = "Er is iets misgegaan, probeer het opnieuw.";
        });
});