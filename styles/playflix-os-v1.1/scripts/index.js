const API_KEY = '03c4e3dc470296959d6bf68804146538'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = {
  original: 'https://image.tmdb.org/t/p/original',
  small: 'https://image.tmdb.org/t/p/w500'
};

const movies = [];
let movieActive = '';
const moviesElement = document.getElementById('movies');
const moviesElement2 = document.getElementById('movies2');

function getUrlMovie(movieId) {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
}

document.querySelector("#channels").addEventListener("click", ()=> {
   document.querySelector("#app").style.display = "none";
   document.querySelector("#iframeChannels").style.display = "block";
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

    /* ============= */
    var pageFilm = document.querySelector("#pageFilm");
    var select__player = document.querySelector("#select__player");
    var loading = document.querySelector("#loading");
    var backPageFilm = document.querySelector("#backPageFilm");
    var backPageSelect = document.querySelector("#backPageSelect");
    var locationMovies = document.querySelector("#iframe");
    var select__player1 = document.querySelector("#select1");
    var select__player2 = document.querySelector("#select2");


    select__player1.addEventListener("click", ()=> {
      document.querySelector(".orientation_video").play();
      var orientation_alert = document.querySelector("#pageFilm  .orientation_alert");
      var marker_contention = document.querySelector("#pageFilm  .marker_contention");

      loading.style.display = "block";
      setTimeout(function() {
        loading.style.display = "none";
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
          select__player.style.display = "block";
        });
        locationMovies.src = 'https://embedflix.net/filme/' + idFilm;
        pageFilm.style.display = "block";
        document.querySelector("#app").style.display = "none";
        document.querySelector("#header").style.display = "none";
        document.querySelector("#navigation").style.display = "none";
        document.querySelector("#main").style.display = "none";
        select__player.style.display = "none";
      }, 500);
    });
    
    // Segunda seleção de player
    select__player2.addEventListener("click", ()=> {
      document.querySelector(".orientation_video").play();
      var orientation_alert = document.querySelector("#pageFilm  .orientation_alert");
      var marker_contention = document.querySelector("#pageFilm  .marker_contention");

      loading.style.display = "block";
      setTimeout(function() {
        loading.style.display = "none";
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
          select__player.style.display = "block";
        });
        locationMovies.src = 'https://embedder.net/e/movie?imdb=' + idFilm;
        pageFilm.style.display = "block";
        document.querySelector("#app").style.display = "none";
        document.querySelector("#header").style.display = "none";
        document.querySelector("#navigation").style.display = "none";
        document.querySelector("#main").style.display = "none";
        select__player.style.display = "none";
      }, 500);
    });

    loading.style.display = "block";
    setTimeout(function() {
      loading.style.display = "none";

      backPageSelect.addEventListener("click", ()=> {
        select__player.style.display = "none";
        pageFilm.style.display = "none";
        document.querySelector("#app").style.display = "flex";
        document.querySelector("#header").style.display = "flex";
        document.querySelector("#navigation").style.display = "block";
        document.querySelector("#main").style.display = "flex";
      });

      select__player.style.display = "block";
    }, 500);
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
  const button = document.createElement('button');
  button.setAttribute('onclick', `changeMainMovie('${movieId}')`);
  button.innerHTML = '<i style="background: #ffffff; color:#000000 ; border-radius: 8em; font-size:35px; padding:4px;" class="bx bx-play"></i>';

  return button;
}

function createImageMovie(movieImage, movieTitle) {
  const divImageMovie = document.createElement('div');
  divImageMovie.classList.add('movie__image');

  const image = document.createElement('img');

  image.setAttribute('src', movieImage);
  image.setAttribute('alt', `Imagem do filme ${movieTitle}`);
  image.setAttribute('loading', 'lazy');

  divImageMovie.appendChild(image);

  return divImageMovie;
}

function addMovieInList(movie) {
  const movieElement = document.createElement('li');
  movieElement.classList.add('movie');

  movieElement.setAttribute('id', movie.id);

  const genre = `<span>${movie.genre}</span>`;
  const title = `<strong>${movie.title}</strong>`;

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
    'tt6723592',
    'tt5034838',
    'tt0499097', 
    'tt5109280',
    'tt6139732',
    'tt1634106',
    'tt0094898',
    'tt6802400',
    'tt0087332',
    'tt4513678',
    'tt7556122',
    'tt13833688',
    'tt2560092',
    'tt11145118',
    'tt6343314',
    'tt3076658',
    'tt14927188',
    'tt13634480',
    'tt3416828',
    'tt1667889',
    'tt1080016',
    'tt0438097',
    'tt0268380',
    'tt6598238',
    'tt4566758',
    'tt0499549',
    'tt9376612',
    'tt2527338',
    'tt2527336',
    'tt3748528',
    'tt2488496',
    'tt0121766',
    'tt0121765',
    'tt0120915',
    'tt0086190',
    'tt0080684',
    'tt0076759',
    'tt10234724',
    'tt9362930',
    'tt8110640',
    'tt1270797',
    'tt7097896',
    'tt0800080',
    'tt0145487',
    'tt4633694',
    'tt10872600',
    'tt9362722',
    'tt0413300',
    'tt0316654',
    'tt2250912',
    'tt6320628',
    'tt0948470',
    'tt1872181',
    'tt1431045',
    'tt5463162',
    'tt1133985',
    'tt6264654',
    'tt2463208',
    'tt2798920',
    'tt0816692',
    'tt0398808',
    'tt0363771',
    'tt0499448',
    'tt0980970',
    'tt0983193',
    'tt0451279',
    'tt7126948',
    'tt8332922',
    'tt1477834',
    'tt6644200',
    'tt0458339',
    'tt4154664',
    'tt3498820',
    'tt1843866',
    'tt2395427',
    'tt1211837',
    'tt3480822',
    'tt0371746',
    'tt7713068',
    'tt1386697',
    'tt1228705',
    'tt1300854',
    'tt0770828',
    'tt4154756',
    'tt4154796',
    'tt11734264',
    'tt0111161',
    'tt0068646',
    'tt0468569',
    'tt2119532',
    'tt0974015',
    'tt2975590',
    'tt12361974',
    'tt0421715',
    'tt1964418',
    'tt7613162',
    'tt0485947',
    'tt1305591',
    'tt5085522',
    'tt15255288',
    'tt3915174',
    'tt12593682',
    'tt1152398',
    'tt13223398',
    'tt1825683',
    'tt2771200',
    'tt1355644',
    'tt10298810',
    'tt1375666',
    'tt2980516',
    'tt5001718',
    'tt2582846',
    'tt2674426',
    'tt6472976',
    'tt3922818',
    'tt0119643',
    'tt6443346',
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
    'tt8760708'
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

const buttonAddMovie = document.getElementById('add__movie')
const search__movie = document.getElementById('search__movie')

function formattedMovieId(movieId) {
  if (movieId.includes('https://www.imdb.com/title/')) {
    const id = movieId.split('/')[4]
    return id
  }

  return movieId
}

buttonAddMovie.addEventListener('submit', async function(event) {
  event.preventDefault()

  const newMovieId = formattedMovieId(event.target['movie'].value)
  const newMovie = await getMovieData(newMovieId)

  if (newMovie?.id) {
    addMovieInList(newMovie)
  }

  event.target['movie'].value = ''
});

loadMovies()

var ads_protectionBx = document.querySelector("#ads_protection");
var ads_protectionBx = document.querySelector("#ads_protectionBx");

ads_protectionBx.addEventListener("click", ()=> {
  document.querySelector(".button__menu").classList.toggle('active');
  ads_protection.classList.toggle('active');
});

var accountButton = document.querySelector("#profile");
var back_from_settings = document.querySelector("#back_from_settings");

accountButton.addEventListener("click", ()=> {
  document.querySelector("#settings").style.display = "block"
  document.querySelector("#app").style.display = "none"
});

back_from_settings.addEventListener("click", ()=> {
  document.querySelector("#settings").style.display = "none"
  document.querySelector("#app").style.display = "flex"
});
