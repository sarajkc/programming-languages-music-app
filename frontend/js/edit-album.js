const id = new URLSearchParams(window.location.search).get('id')

if (!id) {
    window.location.href = './album.html'
}
const breadcrumb = document.getElementById('breadcrumb')
const albId = document.getElementById('id')
const title = document.getElementById('title')
const  releaseYear = document.getElementById('releaseYear')
const genre = document.getElementById('genre')
const totalTracks = document.getElementById('totalTracks')
const artist = document.getElementById('artist')
const created = document.getElementById('created')
const updated = document.getElementById('updated')

fetch(`http://localhost:8000/api/album/id/${id}`)
    .then(rsp => {
        if (rsp.status == 200) {
            return rsp.json();
        }
        alert('Album was not found')
        window.location.href = './album.html'
    })
    .then(data => {
        breadcrumb.innerText = `${data.title}`
        albId.value = data.id
        title.value = data.title
        releaseYear.value = data.releaseYear
        genre.value = data.genre
        totalTracks.value = data.totalTracks


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
            fetch(`http://localhost:8000/api/album/id/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id:data.id,
                    title: title.value,
                    releaseYear: releaseYear.value,
                    genre: genre.value,
                    totalTracks: totalTracks.value,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
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
                        window.location.href = './album.html'
                        return
                    }
                    alert(`Failed to update the album  (HTTP ${rsp.status})`)
                })
        
    })
})

