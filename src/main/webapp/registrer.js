document.querySelector('.form').addEventListener('submit',function (event) {
    event.preventDefault();

    var email = document.getElementById("mail").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = { email: email, password: password,username:username };
    fetch('http://localhost:8080/registeren.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'createProfile.html';
            } else {
                alert('Register failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while register.');
        });

} )


