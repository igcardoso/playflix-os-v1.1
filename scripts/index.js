const API_KEY = '03c4e3dc470296959d6bf68804146538'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = {
  original: 'https://image.tmdb.org/t/p/original',
  small: 'https://image.tmdb.org/t/p/w500'
};


const movies = [];
let movieActive = '';
const moviesElement = document.getElementById('movies');

function getUrlMovie(movieId) {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
}

document.querySelector("#channels").addEventListener("click", ()=> {
  window.location.href = "channels.html";
});

document.querySelector(".button__menu").addEventListener("click", ()=> {
  var button = document.querySelector('.button__menu');
  var navigation = document.querySelector('.navigation');

  navigation.classList.toggle('active');
});

function setMainMovie(movie) {
  const appImage = document.querySelector('.app__image img');
  const title = document.querySelector('.feature__movie h1');
  const description = document.querySelector('.feature__movie p');
  const info = document.querySelector('.feature__movie span');
  const showButton = document.querySelector('.feature__movie .playFilm');
  const rating = document.querySelector(".rating strong");

  const idFilm = movie.id;
  showButton.addEventListener("click", ()=> {
    document.querySelector(".orientation_video").play();
    var pageFilm = document.querySelector("#pageFilm");
    var loading = document.querySelector("#loading");
    var orientation_alert = document.querySelector("#pageFilm  .orientation_alert");
    var marker_contention = document.querySelector("#pageFilm  .marker_contention");
    var backPageFilm = document.querySelector("#backPageFilm");
    var locationMovies = document.querySelector("#iframe");

    loading.style.left = "0";
    setTimeout(function() {
      loading.style.left = "-100%";
      marker_contention.addEventListener("click", ()=> {
        orientation_alert.style.transform = "translateY(-100%)";
        document.querySelector(".orientation_video").pause();

      });

      backPageFilm.addEventListener("click", ()=> {
        document.querySelector(".orientation_video").pause();
        locationMovies.src = "";
        pageFilm.style.display = "none";
        document.querySelector("#app").style.display = "flex";
        document.querySelector("#header").style.display = "flex";
        document.querySelector("#navigation").style.display = "block";
        document.querySelector("#main").style.display = "flex";
      });
      locationMovies.src = 'https://embedder.net/e/movie?imdb=' + idFilm;
      pageFilm.style.display = "block";
      document.querySelector("#app").style.display = "none";
      document.querySelector("#header").style.display = "none";
      document.querySelector("#navigation").style.display = "none";
      document.querySelector("#main").style.display = "none";
    }, 2000);
  });
  title.innerHTML = movie.title;
  description.innerHTML = movie.overview;
  rating.innerHTML = movie.vote_average;
  info.innerHTML = movie.release + ' - ' + movie.genre + ' - Filme';

  appImage.setAttribute('src',
    movie.image.original);
}

function changeMovieActiveInList(newMovieActive) {
  const movieActiveCurrent = document.getElementById(movieActive);
  movieActiveCurrent.classList.remove('active-movie');

  const movieActiveNew = document.getElementById(newMovieActive);
  movieActiveNew.classList.add('active-movie');

  movieActive = newMovieActive;
}

function changeMainMovie(movieId) {
  changeMovieActiveInList(movieId);
  document.querySelector('.navigation').classList.toggle('active');

  const movie = movies.find(movie => movie.id === movieId);

  if (movie.id) {
    setMainMovie(movie);
    changeButtonMenu();
  } else {
    console.log(movies);
    console.log('não foi possível achar o filme com o id', movieId);
  }
}

function createButtonMovie(movieId) {
  const button = document.createElement('button')
  button.setAttribute('onclick', `changeMainMovie('${movieId}')`)
  button.innerHTML = '<i style="background: #ffffff; color:#000000 ; border-radius: 8em; font-size:35px; padding:4px;" class="bx bx-play"></i>'

  return button
}

function createImageMovie(movieImage, movieTitle) {
  const divImageMovie = document.createElement('div')
  divImageMovie.classList.add('movie__image')

  const image = document.createElement('img')

  image.setAttribute('src', movieImage)
  image.setAttribute('alt', `Imagem do filme ${movieTitle}`)
  image.setAttribute('loading', 'lazy')

  divImageMovie.appendChild(image)

  return divImageMovie
}

function addMovieInList(movie) {
  const movieElement = document.createElement('li')
  movieElement.classList.add('movie')

  movieElement.setAttribute('id', movie.id)

  const genre = `<span>${movie.genre}</span>`
  const title = `<strong>${movie.title}</strong>`

  movieElement.innerHTML = genre + title
  movieElement.appendChild(createButtonMovie(movie.id))
  movieElement.appendChild(createImageMovie(movie.image.small, movie.title))

  moviesElement.appendChild(movieElement)
}

async function getMovieData(movieId) {
  const isMovieInList = movies.findIndex(movie => movie.id === movieId)

  if (isMovieInList === -1) {
    try {
      let data = await fetch(getUrlMovie(movieId))
      data = await data.json()

      const movieData = {
        id: movieId,
        title: data.title,
        overview: data.overview,
        vote_average: data.vote_average,
        genre: data.genres[0].name,
        release: data.release_date.split('-')[0],
        image: {
          original: BASE_URL_IMAGE.original.concat(data.backdrop_path),
          small: BASE_URL_IMAGE.small.concat(data.backdrop_path),
        }
      }
      movies.push(movieData)

      return movieData
    } catch(error) {
      console.log('mensagem de erro:', error.message)
    }
  }

  return null
}

function loadMovies() {
  const LIST_MOVIES = [
    'tt6443346',
    'tt10298810',
    'tt9114286',
    'tt9686790',
    'tt4154756',
    'tt17663992',
    'tt15486810',
    'tt8041270',
    'tt10872600',
    'tt12003946',
    'tt2953050',
    'tt10648342',
    'tt10954600',
    'tt0448115',
    'tt3228774',
    'tt0800369',
    'tt9419884',
    'tt12412888',
    'tt3794354',
    'tt1877830',
    'tt10838180',
    'tt15229674',
    'tt4154796',
    'tt1790864',
    'tt1386697',
    'tt1630029',
    'tt12801262',
    'tt9376612',
    'tt14641788',
    'tt7846844',
    'tt1051906',
    'tt5433140',
    'tt9032400',
    'tt1464335',
    'tt7097896',
    'tt9848626',
    'tt14668630',
    'tt0195099',
    'tt9421570',
    'tt1649418',
    'tt2948372',
    'tt7286456',
    'tt5117670',
    'tt8376234',
    'tt3915174'
  ]

  LIST_MOVIES.map(async (movie, index) => {
    const movieData = await getMovieData(movie)

    addMovieInList(movieData)

    if (index === 0) {
      setMainMovie(movieData)
      movieActive = movieData.id

      const movieActiveNew = document.getElementById(movieActive)
      movieActiveNew.classList.add('active-movie')
    }
  })
}

const buttonAddMovie = document.getElementById('search__movie')

function formattedMovieId(movieId) {
  if (movieId.includes('https://www.imdb.com/title/')) {
    const id = movieId.split('/')[4]
    return id
  }

  return movieId
}

buttonAddMovie.addEventListener('submit', 
})

loadMovies()

var ads_protectionBx = document.querySelector("#ads_protection");
var ads_protectionBx = document.querySelector("#ads_protectionBx");

ads_protectionBx.addEventListener("click", ()=> {
  document.querySelector(".button__menu").classList.toggle('active');
  ads_protection.classList.toggle('active');
});
