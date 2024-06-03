document.querySelector('.form').addEventListener('submit',function (event) {
    event.preventDefault();
    console.log("fout")

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = { username: username, password: password };

    fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                window.location.href = './createProfile.html';
            } else {
                alert('Login failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while logging in.');
    });})