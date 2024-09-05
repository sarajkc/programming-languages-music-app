const id = new URLSearchParams(window.location.search).get('id')

if (!id){

     window.location.href = './artist.html'
}
   
const breadcrumb = document.getElementById('breadcrumb')
const artid = document.getElementById('id')
const artname = document.getElementById('name')
const birthYear = document.getElementById('birthYear')
const nationality = document.getElementById('nationality')
const created = document.getElementById('created')
const updated = document.getElementById('updated')

fetch(`http://localhost:8000/api/artist/id/${id}`)
    .then(rsp => {
        if (rsp.status === 200){
            return rsp.json();

            }

        alert('Artist was not found')
        window.location.href = './artist.html'
    })
    .then(data => {
        breadcrumb.innerText = `${data.name}`
        artid.value = data.id
        artname.value = data.name
        birthYear.value = data.birthYear
        nationality.value = data.nationality
        created.value = formatDate(data.createdAt)
        updated.value = formatDate(data.updatedAt)

        document.getElementById('save').addEventListener('click', () => {
            fetch(`http://localhost:8000/api/artist/id/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: data.id,
                    name: artname.value,
                    birthYear: birthYear.value,
                    nationality: nationality.value,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                })
            })
            
                .then(rsp => {
                    if (rsp.ok) {
                        window.location.href = './artist.html';
                        return;
                    }

                    return rsp.json().then(error => {

                     alert(`Failed to update the artist: ${error.message} (HTTP ${rsp.status})`)
                    })

                    
                })
        })
    })