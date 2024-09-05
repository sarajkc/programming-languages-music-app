const table = document.getElementById('table')
const template = document.getElementById('album')


    fetch(`http://localhost:8000/api/album`)
        .then(rsp => rsp.json())
        .then(data => {
        
            data.forEach(album => {
                const copy = template.content.cloneNode(true)
                copy.querySelector('.id').innerText = album.id
                copy.querySelector('.title').innerText = album.title
                copy.querySelector('.releaseYear').innerText = album.releaseYear
                copy.querySelector('.genre').innerText = album.genre
                copy.querySelector('.totalTracks').innerText = album.totalTracks
                copy.querySelector('.artist').innerText = album.artist.name
                copy.querySelector('.created').innerText = formatDate(album.createdAt)
                copy.querySelector('.updated').innerText = formatDate(album.updatedAt)
                copy.querySelector('.edit').href = `./edit-album.html?id=${album.id}`
                copy.querySelector('.remove').addEventListener('click', () => {
                    Swal.fire({
                        title: `Are you sure you want to remove  ${album.title}  from the list?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#696969",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Absolutely!"

                    }).then((result) => {
                        if (result.isConfirmed) {

                        fetch(`http://localhost:8000/api/album/id/${album.id}`, {
                            method: 'DELETE',
                        })
                            .then(rsp => {
                                if (rsp.status === 204) {
                                    window.location.href = './album.html'
                                    return
                                }
                                alert(`Failed to remove the album (HTTP ${rsp.status})`)
                            })
                    }
                })
        })

        
                table.appendChild(copy)
            })

        }) 