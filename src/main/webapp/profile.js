document.querySelector('.form').addEventListener('submit',function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var gender = document.getElementById("gender").value;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;

    var data = { name:name, gender:gender,height:height,weight:weight};

    fetch('http://localhost:8080/createProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'dashboard.html';
            } else {
                alert('creating profile failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating profile.');
        });

} )
