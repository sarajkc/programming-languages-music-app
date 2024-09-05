const table = document.getElementById('table')
const template = document.getElementById('song')

    fetch(`http://localhost:8000/api/song`)
        .then(rsp => rsp.json())
        .then(data => {
        
            data.forEach(song => {
                const copy = template.content.cloneNode(true)
                copy.querySelector('.id').innerText = song.id
                copy.querySelector('.songTitle').innerText = song.songTitle
                copy.querySelector('.duration').innerText = song.duration
                copy.querySelector('.album').innerText = song.album.title
                copy.querySelector('.artist').innerText = song.artist.name
                copy.querySelector('.created').innerText = formatDate(song.createdAt)
                copy.querySelector('.updated').innerText = formatDate(song.updatedAt)
                copy.querySelector('.edit').href = `./edit-song.html?id=${song.id}`
                copy.querySelector('.remove').addEventListener('click', () => {
                   
                        Swal.fire({
                            title: `Are you sure you want to remove  ${song.songTitle}  from the list?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#696969",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Absolutely!"
    
                        }).then((result) => {
                            if (result.isConfirmed) {
    
                            fetch(`http://localhost:8000/api/song/id/${song.id}`, {
                                method: 'DELETE',
                            })
                                .then(rsp => {
                                    if (rsp.status === 204) {
                                        window.location.href = './song.html'
                                        return
                                    }
                                    alert(`Failed to remove the song (HTTP ${rsp.status})`)
                                })
                        }
                    })
            })
    
            
                    table.appendChild(copy)
                })
    
            })
    
        
                    