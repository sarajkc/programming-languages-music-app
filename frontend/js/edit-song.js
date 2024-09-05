const id = new URLSearchParams(window.location.search).get('id')

if (!id)
    window.location.href = './song.html'

const breadcrumb = document.getElementById('breadcrumb')
const soId = document.getElementById('id')
const songTitle = document.getElementById('songTitle')
const  duration = document.getElementById('duration')
const album = document.getElementById('album')
const artist = document.getElementById('artist')
const created = document.getElementById('created')
const updated = document.getElementById('updated')

fetch(`http://localhost:8000/api/song/id/${id}`)
    .then(rsp => {
        if (rsp.status === 200)
            return rsp.json()

        alert('Song was not found')
        window.location.href = './song.html'
    })
    .then(data => {
        breadcrumb.innerText = `${data.songTitle}`
        soId.value = data.id
        songTitle.value = data.songTitle
        duration.value = data.duration

        fetch('http://localhost:8000/api/album')
        .then(rsp => rsp.json())
        .then(albums => {

            const albumSelectElement = document.getElementById('album');

                albums.forEach( albumData => {
                    const optionElement = document.createElement('option');

                    optionElement.value = albumData.id;
                    optionElement.text = albumData.title;


                    if(albumData.id === data.album.id){
                        optionElement.selected = true;
                    }

                    albumSelectElement.appendChild(optionElement)
                });
                    
                });


                fetch('http://localhost:8000/api/artist')
                .then(rsp => rsp.json())
                .then(artists => {
        
                    const artistSelectElement = document.getElementById('artist');
        
                        artists.forEach( artistData => {
                            const optionElement = document.createElement('option');
        
                            optionElement.value = artistData.id;
                            optionElement.text = artistData.name;
        
        
                            if(artistData.id === data.artist.id){
                                optionElement.selected = true;
                            }
        
                           artistSelectElement.appendChild(optionElement)
                });
                    
                });
        
        created.value = formatDate(data.createdAt)
        updated.value = formatDate(data.updatedAt)
 

        document.getElementById('save').addEventListener('click', () => {
            fetch(`http://localhost:8000/api/song/id/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id:data.id,
                    songTitle: songTitle.value,
                    duration: duration.value,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    album: {
                        id: data.album.id,
                        title: album.title,
                        createdAt: data.album.createdAt,
                        updatedAt: data.album.updatedAt
                    },

                    artist: {
                        id: data.artist.id,
                        name: artist.value,
                        createdAt: data.artist.createdAt,
                        updatedAt: data.artist.updatedAt
                    }
                })
            })
            .then(rsp => {
                if (rsp.ok) {
                    window.location.href = './song.html'
                    return
                }
                alert(`Failed to update the song  (HTTP ${rsp.status})`)
            })
    
})
})

