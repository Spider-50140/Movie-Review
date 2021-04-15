const url =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6bbea6a4efed816a4dc72d9f37f2d332&page=1'
const img_path = 'https://image.tmdb.org/t/p/w1280'
const search =
  'https://api.themoviedb.org/3/search/movie?api_key=6bbea6a4efed816a4dc72d9f37f2d332&query="'

const form = document.getElementById('form')
const src = document.getElementById('search')
const main = document.getElementById('main')

movie(url)

async function movie(api_url) {
  const response = await fetch(api_url)
  const user = await response.json()
  console.log(user.results)
  bringmovie(user.results)
}

function bringmovie(data) {
  main.innerHTML = ''
  data.forEach((element) => {
    const { title, poster_path, overview, vote_average } = element

    const movieel = document.createElement('div')
    movieel.classList.add('movie')
    movieel.innerHTML = ` <img  src="${
      img_path + poster_path
    }" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${voterating(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`

    main.appendChild(movieel)
  })
}

function voterating(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const look = src.value
  if (look && look !== '') {
    movie(search + look)
    src.value = ''
  } else {
    window.location.reload()
  }
})
