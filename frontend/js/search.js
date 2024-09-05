const searchInput = document.getElementById('search')
const params = new URLSearchParams(window.location.search)
const searchParam = params.get('search')

if (searchParam != null && searchParam != '') {
    searchInput.value = searchParam
}

document.getElementById('search-btn')
    .addEventListener('click', () => {
        doSearch()
    })

    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("search-btn").click();
        }
      });

function doSearch() { 
    if (searchInput.value == '') {
        window.location.href = './artist.html'
        return
    }
    window.location.href = `./artist.html?search=${searchInput.value}`
}

function formatDate(iso) {
    if (iso == null) return 'N/A'
    return new Date(iso).toLocaleString('sr-RS')
}
