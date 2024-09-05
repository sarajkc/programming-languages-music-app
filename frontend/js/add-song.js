const songTitle = document.getElementById('songTitle')
const duration = document.getElementById('duration')

fetch('http://localhost:8000/api/album')
.then(rsp => rsp.json())
.then(albumData => {

        albumData.forEach( albumType => {
            const optionElement = document.createElement('option');
            optionElement.value = albumType.id;
            optionElement.text = albumType.title;
            album.appendChild(optionElement)
        });
            
 });

    fetch('http://localhost:8000/api/artist')
    .then(rsp => rsp.json())
    .then(artistData => {
    
            artistData.forEach( artistType => {
                const optionElement = document.createElement('option');
                optionElement.value = artistType.id;
                optionElement.text = artistType.name;
                artist.appendChild(optionElement)
            });
                
     });

    document.getElementById('save').addEventListener('click',() => {

        if (songTitle.value == null || songTitle.value == '' || duration.value == null || duration.value == '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please complete all fields!",
            });
            return
        }

        const songData = {
            songTitle: songTitle.value,
            duration: duration.value,
            album: {
                id: album.value,
                title: album.title
            },

            artist: {
                id: artist.value,
                name: artist.name
            }
        }

        fetch('http://localhost:8000/api/song', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songData)
        })

            .then(rsp => {
                if (rsp.ok) {
                    window.location.href = './song.html';
                    return;
                }
            })
    })
