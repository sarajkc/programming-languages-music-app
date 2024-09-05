
const table = document.getElementById('table')
const template = document.getElementById('artist')
const searchTitle = document.getElementById('search-title')

if (searchParam != null && searchParam != '') {
    searchTitle.innerText = 'Artist search'
    fetchArtists('/name/' + searchParam)
} else {
    searchTitle.innerText = 'Artists'
    fetchArtists()
}

function fetchArtists(url = '') {
    fetch(`http://localhost:8000/api/artist${url}`)
        .then(rsp => rsp.json())
        .then(data => {
            if (data.length === 0) {
                alert('Artist was not found')
                window.location.href = './artist.html'
                return
            }
            data.forEach(artist => {
                const copy = template.content.cloneNode(true)
                copy.querySelector('.id').innerText = artist.id
                copy.querySelector('.name').innerText = artist.name
                copy.querySelector('.birthYear').innerText = artist.birthYear
                copy.querySelector('.nationality').innerText = artist.nationality
                copy.querySelector('.created').innerText = formatDate(artist.createdAt)
                copy.querySelector('.updated').innerText = formatDate(artist.updatedAt)
                copy.querySelector('.edit').href = `./edit-artist.html?id=${artist.id}`
                copy.querySelector('.remove').addEventListener('click', () => {
                    
                    Swal.fire({
                        title: `Are you sure you want to remove  ${artist.name}  from the list?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#696969",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Absolutely!"

                    }).then((result) => {
                        if (result.isConfirmed) {

                        fetch(`http://localhost:8000/api/artist/id/${artist.id}`, {
                            method: 'DELETE',
                        })
                            .then(rsp => {
                                if (rsp.status === 204) {
                                    window.location.href = './artist.html'
                                    return
                                }
                                alert(`Failed to remove the artist (HTTP ${rsp.status})`)
                            })
                    }
                })
        })

        
                table.appendChild(copy)
            })

        })

    }
                
        
