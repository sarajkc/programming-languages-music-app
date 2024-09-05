const title = document.getElementById('title')
const releaseYear = document.getElementById('releaseYear')
const genre = document.getElementById('genre')
const totalTracks = document.getElementById('totalTracks')

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
     if (title.value == null || title.value == '' || releaseYear.value == null || releaseYear.value == '' || genre.value == null || genre.value == '' || totalTracks.value == null || totalTracks.value == '') {
         Swal.fire({
             icon: "error",
             title: "Oops...",
             text: "Please complete all fields!",
         });
         return
     }

const albumData = {
   title: title.value,
   releaseYear: releaseYear.value,
   genre: genre.value,
   totalTracks: totalTracks.value,
   artist:{
       id: artist.value,
       name: artist.name
   }
}
    fetch('http://localhost:8000/api/album', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumData)
    })
        .then(rsp => {
            if (rsp.ok) {
                window.location.href = './album.html';
                return;
            }
})
     })