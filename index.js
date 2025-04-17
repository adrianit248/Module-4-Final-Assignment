const moviesListIndices = document.querySelector(".populate-list")
const fakeLoader = document.querySelector(".loading__body");
let filter2
let film2


//     return `<div class="movie-card" onclick="showUserPosts(${user.id})">
function moviesHTML(movie) {
    return `<div class="movie-card">
                <div class="movie-card__container">
                    <h3>${movie.Title}</h3>
                    <img class="movie__poster--img" src="${movie.Poster}" alt="">
                    <p><b>Year:</b> ${movie.Year}</p>
                    <p><b>IMDB ID:</b> ${movie.imdbID}</p>
                </div>
            </div>`
}

async function onSearch(event) {
    const film = event.target.value
    console.log(film)

    fakeLoader.classList += " start-state"
    fakeLoader.classList.remove(".start-state")
    fakeLoader.classList += " movies__loading"
    
    setTimeout(() => {
        fakeLoader.classList.remove(".movies__loading")
        fakeLoader.classList += " movies__loaded"
        fakeLoader.classList.remove(".movies__loaded")
        parseSearch(film)
    }, 1500);
}

async function parseSearch(film) {
    film2 = film
    const movieSearch = await fetch(`https://www.omdbapi.com/?apikey=a7004db5&s=${film}`)
    const movieSearchData = await movieSearch.json()
    
    console.log(movieSearchData.Search)
    const moviesArray = (movieSearchData.Search).slice(0, 6)

    if (filter2 === "OLDEST_TO_NEWEST") {
        moviesArray.sort((a, b) => (a.Year) - (b.Year))
      }
      else if (filter2 === "NEWEST_TO_OLDEST") {
        moviesArray.sort((a, b) => (b.Year) - (a.Year))
      }
    
    moviesListIndices.innerHTML = moviesArray.map((movie) => moviesHTML(movie)).join('')

}

function onFilter(event) {
    let filter = event.target.value
    filter2 = filter
    parseSearch(film2)
}