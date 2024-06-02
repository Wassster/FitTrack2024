var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
var data = { email: email, password: password };

fetch('http://localhost:8080/api/login/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then(response => {
        if (response.ok) {
            window.location.href = '/createProfile.html';
        } else {
            alert('Login failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
    });