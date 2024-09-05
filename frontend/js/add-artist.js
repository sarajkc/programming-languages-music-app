const name = document.getElementById('name')
const birthYear = document.getElementById('birthYear')
const nationality = document.getElementById('nationality')


document.getElementById('save').addEventListener('click', () => {
    if (name.value == null || name.value == '' || birthYear.value == null || birthYear.value == '' || nationality.value == null || nationality.value == '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please complete all fields!",
        });
        return
    }

    fetch('http://localhost:8000/api/artist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            birthYear: birthYear.value,
            nationality: nationality.value,
        })
    }).then(rsp => {
        if (rsp.ok) {
            window.location.href = './artist.html'
            return
        }
    })
})