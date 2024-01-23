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
	// document.querySelector("#app").style.display = "none";
	// document.querySelector("#iframeChannels").style.display = "block";
	window.alert("Não é possível acessar os canais, desculpe pelo inconveniente, algumas funcionalidades estão passando por reparos, aproveite os filmes.")
});

document.querySelector(".button__menu").addEventListener("click", ()=> {
	var button = document.querySelector('.button__menu');
	var navigation = document.querySelector('.navigation');

	navigation.classList.toggle('active');
});


setTimeout(function() {
	loading.style.display = "none";
	document.getElementById("labelNameUi").innerHTML = "Aguarde...";
},
	2000);

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
				locationMovies.src = 'https://embedder.net/e/' + idFilm;
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
				locationMovies.src = 'https://embedflix.net/filme/' + idFilm;
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
		'tt10676048',

		'tt14371878',

		'tt6166392',

		'tt13287846',

		'tt16277242',

		'tt9663764',

		'tt18559720',

		'tt12964320',

		'tt14865406',

		'tt6587046',

		'tt27110516',

		'tt17352384',

		'tt15314262',

		'tt29195117',

		'tt2016303',

		'tt15398776',

		'tt10545296',

		'tt0984084',

		'tt0325950',

		'tt10767052',

		'tt16431870',

		'tt26047818',

		'tt5433140',

		'tt6495056',

		'tt14895206',

		'tt7529298',

		'tt14998742',

		'tt14362112',

		'tt8948208',

		'tt5537002',

		'tt1517268',

		'tt3291150',

		'tt5755238',

		'tt23736044',

		'tt23289160',

		'tt10648326',

		'tt14230458',

		'tt5090568',

		'tt10366206',

		'tt4589218',

		'tt6718170',

		'tt14867006',

		'tt11858890',

		'tt16300962',

		'tt11304740',

		'tt21909764',

		'tt9362722',

		'tt6598238',

		'tt8804830',

		'tt10872600',

		'tt9603212',

		'tt9224104',

		'tt15744298',

		'tt15789038',

		'tt10638522',

		'tt30253266',

		'tt1448754',

		'tt0104431',

		'tt1630029',

		'tt17024450',

		'tt3915174',

		'tt0186720',

		'tt20420538',

		'tt4154756',

		'tt17351924',

		'tt17154734',

		'tt19705884',

		'tt8960138',

		'tt14539740',

		'tt14418234',

		'tt4495098',

		'tt8337264',

		'tt12483708',

		'tt0439572',

		'tt9050310',

		'tt14570440',

		'tt29344984',

		'tt15837338',

		'tt15141632',

		'tt15799866',

		'tt1477834',

		'tt16444610',

		'tt12747748',

		'tt2637276',

		'tt22041854',

		'tt7909204',

		'tt12921446',

		'tt11762114',

		'tt9362930',

		'tt6791350',

		'tt10160976',

		'tt1462764',

		'tt14935892',

		'tt0367594',

		'tt10334148',

		'tt6984230',

		'tt19861160',

		'tt8273104',

		'tt6603378',

		'tt15768848',

		'tt21807222',

		'tt2119532',

		'tt9383752',

		'tt7599146',

		'tt0241527',

		'tt13924672',

		'tt15251228',

		'tt0816692',

		'tt30342692',

		'tt6906292',

		'tt10110826',

		'tt0295297',

		'tt15334488',

		'tt14858054',

		'tt28152455',

		'tt11893676',

		'tt1856101',

		'tt0325980',

		'tt0142248',

		'tt1200263',

		'tt4154796',

		'tt8041270',

		'tt14514964',

		'tt6685538',

		'tt2527336',

		'tt9682428',

		'tt26084002',

		'tt22022452',

		'tt5971474',

		'tt13784650',

		'tt1637725',

		'tt2310332',

		'tt15238852',

		'tt0330373',

		'tt11707848',

		'tt21214842',

		'tt0926084',

		'tt14083308',

		'tt1745960',

		'tt0304141',

		'tt2953050',

		'tt1160419',

		'tt1877830',

		'tt5034838',

		'tt13086266',

		'tt0198781',

		'tt0126029',

		'tt15789472',

		'tt21654390',

		'tt0417741',

		'tt4181232',

		'tt0068646',

		'tt29266871',

		'tt0067992',

		'tt0100405',

		'tt1856080',

		'tt10954600',

		'tt6727598',

		'tt0111161',

		'tt0892791',

		'tt8042312',

		'tt1298650',

		'tt1201607',

		'tt8097030',

		'tt2096673',

		'tt6467266',

		'tt9114286',

		'tt10364034',

		'tt9647880',

		'tt0848228',

		'tt0449088',

		'tt0373889',

		'tt29538571',

		'tt0114709',

		'tt0363771',

		'tt21387514',

		'tt30629563',

		'tt8589698',

		'tt17663876',

		'tt26736061',

		'tt1951265',

		'tt14849194',

		'tt8747160',

		'tt10648342',

		'tt1790864',

		'tt0120338',

		'tt0377092',

		'tt1648190',

		'tt0383574',

		'tt14922584',

		'tt0298148',

		'tt12996154',

		'tt2850386',

		'tt0106246',

		'tt23556408',

		'tt6443346',

		'tt10151854',

		'tt30524053',

		'tt0499549',

		'tt13070038',

		'tt2322441',

		'tt15296186',

		'tt9848626',

		'tt0120737',

		'tt2380307',

		'tt9355200',

		'tt13197764',

		'tt4873118',

		'tt11145118',

		'tt12412888',

		'tt0412080',

		'tt8291224',

		'tt3741700',

		'tt17009710',

		'tt0245429',

		'tt15062980',

		'tt0268380',

		'tt4477536',

		'tt9419884',

		'tt1469304',

		'tt22890246',

		'tt0468569',

		'tt4123432',

		'tt0948470',

		'tt8141472',

		'tt0139151',

		'tt11365186',

		'tt0110357',

		'tt15326988',

		'tt4633694',

		'tt0398286',

		'tt15340724',

		'tt13833722',

		'tt7710588',

		'tt0120855',

		'tt1001520',

		'tt4546694',

		'tt2316204',

		'tt0101414',

		'tt9695404',

		'tt27155038',

		'tt0814255',

		'tt1392190',

		'tt13069986',

		'tt15485390',

		'tt6806448',

		'tt0347149',

		'tt10788058',

		'tt27750364',

		'tt13345606',

		'tt0133093',

		'tt14571220',

		'tt13017204',

		'tt13033818',

		'tt0382932',

		'tt8258502',

		'tt21692408',

		'tt13539646',

		'tt0364970',

		'tt0455944',

		'tt1431045',

		'tt15671028',

		'tt7214954',

		'tt5463162',

		'tt18083578',

		'tt11866324',

		'tt5113044',

		'tt11744496',

		'tt20112600',

		'tt0371746',

		'tt6528290',

		'tt1157720',

		'tt24076348',

		'tt2674426',

		'tt14846026',

		'tt8080204',

		'tt11778102',

		'tt2245084',

		'tt5518158',

		'tt15354916',

		'tt10950320',

		'tt15978956',

		'tt2948372',

		'tt0429609',

		'tt15325794',

		'tt4425200',

		'tt21106646',

		'tt4126476',

		'tt0327597',

		'tt1099212',



		'tt2713180',

		'tt9288486',

		'tt0097757',

		'tt1324999',

		'tt14463484',

		'tt12263384',

		'tt17663992',

		'tt30524107',

		'tt0167261',

		'tt0393162',

		'tt9109072',

		'tt0116126',

		'tt6654210',

		'tt1263750',

		'tt1375666',

		'tt16253418',

		'tt11083552',

		'tt12801262',

		'tt11832046',

		'tt22796890',

		'tt1667889',

		'tt16428256',

		'tt11032374',

		'tt6146586',

		'tt14331144',

		'tt1049413',

		'tt0993846',

		'tt0120762',

		'tt1661199',

		'tt2294629',

		'tt26742994',

		'tt10362466',

		'tt7069210',

		'tt0137523',

		'tt21054736',

		'tt13375076',

		'tt2267998',

		'tt1648216',

		'tt7097896',

		'tt10929458',

		'tt0076759',

		'tt0145487',

		'tt0167260',

		'tt9896768',

		'tt5761544',

		'tt0266543',



		'tt28670752',

		'tt2820852',

		'tt1663662',

		'tt12361974',

		'tt3470600',

		'tt1872181',

		'tt0120363',

		'tt2250912',

		'tt1228705',

		'tt1216475',

		'tt6334354',

		'tt14614892',

		'tt19878422',

		'tt9674196',

		'tt21245882',

		'tt13721828',

		'tt1956620',

		'tt0903624',

		'tt6932874',

		'tt2386490',

		'tt7143598',

		'tt2771200',

		'tt14888860',

		'tt0441773',

		'tt12593682',

		'tt9777666',

		'tt15239678',

		'tt13238346',

		'tt1675434',

		'tt0356634',

		'tt0413300',

		'tt22688572',

		'tt6105098',

		'tt1572315',

		'tt9032400',

		'tt0831387',

		'tt10327252',

		'tt5105136',

		'tt15153532',

		'tt15458866',

		'tt4520920',

		'tt1790809',

		'tt1673434',

		'tt4520988',

		'tt13405778',

		'tt22698070',

		'tt3498820',

		'tt16183464',

		'tt0172495',

		'tt9242528',

		'tt13560574',

		'tt0381707',

		'tt13603966',

		'tt2229499',

		'tt1853728',

		'tt1482459',

		'tt12261776',

		'tt15565710',

		'tt2802144',

		'tt2906216',

		'tt1080016',

		'tt1293847',

		'tt11050992',

		'tt7126948',

		'tt2948356',

		'tt12496706',

		'tt6587640',

		'tt0780521',

		'tt0369610',

		'tt3183660',

		'tt0914798',

		'tt0110912',

		'tt0104014',

		'tt1119646',

		'tt0413267',

		'tt0042332',

		'tt2395427',

		'tt8408218',

		'tt11531410',

		'tt26350277',

		'tt4154664',

		'tt5884796',

		'tt9893130',

		'tt2126355',

		'tt30691232',

		'tt1345836',

		'tt6320628',

		'tt6751668',

		'tt3794354',

		'tt3606752',

		'tt10275080',

		'tt1446714',

		'tt5311514',

		'tt1951264',

		'tt0974015',

		'tt0109830',

		'tt14081914',

		'tt24079846',

		'tt14509110',

		'tt4880510',

		'tt1457767',

		'tt14391088',

		'tt3315342',

		'tt27446773',

		'tt1464335',

		'tt9100018',

		'tt0103064',

		'tt0103639',

		'tt4081630',

		'tt1911658',

		'tt11634048',

		'tt0078748',

		'tt22474136',

		'tt3228774',

		'tt9376612',

		'tt7759362',

		'tt2692250',

		'tt1291150',

		'tt1130884',

		'tt19119598',

		'tt0351283',

		'tt1340138',

		'tt5052448',

		'tt0851578',

		'tt2582802',

		'tt28105944',

		'tt11564570',

		'tt1170358',

		'tt1302011',

		'tt26674627',

		'tt22868842',



		'tt4881806',

		'tt6856242',

		'tt2191701',

		'tt1797504',

		'tt3731562',

		'tt3344680',

		'tt0451279',

		'tt8032034',

		'tt0407304',

		'tt1679235',

		'tt0790724',

		'tt0816711',

		'tt1014759',

		'tt0119282',

		'tt11867418',

		'tt0892769',

		'tt11069220',

		'tt18501888',

		'tt0433035',

		'tt2103281',

		'tt4779682',

		'tt13582180',



		'tt12519802',

		'tt1979388',

		'tt27687527',

		'tt0910970',

		'tt0120131',

		'tt5834426',

		'tt6879446',

		'tt0088247',

		'tt1016150',

		'tt2382320',

		'tt1690953',

		'tt0099674',

		'tt5315212',

		'tt27348312',

		'tt0264464',

		'tt4630562',

		'tt0082971',

		'tt0424095',

		'tt4912910',

		'tt0096283',

		'tt0317705',

		'tt6722400',

		'tt0360717',

		'tt23060796',

		'tt0332280',

		'tt10640346',

		'tt11057302',

		'tt21114104',



		'tt1979376',

		'tt4513678',

		'tt19465630',

		'tt0822854',

		'tt11245972',

		'tt0307453',

		'tt3501632',

		'tt1951266',

		'tt5814060',

		'tt0120616',

		'tt10696896',

		'tt0071562',

		'tt0758752',

		'tt1375670',

		'tt15575470',

		'tt1981128',

		'tt0092099',

		'tt23644572',

		'tt2446042',

		'tt5259966',

		'tt2557478',

		'tt0097576',

		'tt1723121',

		'tt4046784',

		'tt0876563',

		'tt4777008',

		'tt1211837',

		'tt1325004',

		'tt4262980',

		'tt1323594',

		'tt6565702',

		'tt0332452',



		'tt8447170',

		'tt0118692',

		'tt2239822',

		'tt5109280',

		'tt11908172',

		'tt1270797',

		'tt0435761',

		'tt0112573',

		'tt15670222',

		'tt2975590',

		'tt8685672',

		'tt1628841',

		'tt4500922',

		'tt26224944',

		'tt0462538',

		'tt1300854',



		'tt0952640',

		'tt2109248',

		'tt6263850',

		'tt1589487',

		'tt28814949',

		'tt0142245',

		'tt0120689',

		'tt2084970',

		'tt3704428',

		'tt2527338',

		'tt16527824',

		'tt3040964',

		'tt0120917',

		'tt10838180',

		'tt0113277',

		'tt10403420',

		'tt0093773',

		'tt1217209',

		'tt0800369',



		'tt27391124',

		'tt25406052',

		'tt22868844',

		'tt7991608',

		'tt4016934',

		'tt0361748',

		'tt0360486',

		'tt0086250',

		'tt14145436',

		'tt1453405',

		'tt0142232',

		'tt0458352',

		'tt19887550',

		'tt13651794',

		'tt1677720',

		'tt4649466',

		'tt10448662',

		'tt1646971',

		'tt0088763',

		'tt5073620',

		'tt1772341',

		'tt16513514',

		'tt23553530',

		'tt0160245',

		'tt6966692',

		'tt6710474',

		'tt1825683',

		'tt1655441',

		'tt5700672',

		'tt3480822',

		'tt6133466',

		'tt2267968',

		'tt7985704',

		'tt1679335',

		'tt1318514',

		'tt0414387',

		'tt5220122',

		'tt0050083',

		'tt13223398',

		'tt0479952',

		'tt1259571',

		'tt0080491',

		'tt10370456',

		'tt5108870',

		'tt0108052',

		'tt22042742',

		'tt12672536',

		'tt0170016',

		'tt12915716',

		'tt1981115',

		'tt13927994',

		'tt3606756',

		'tt18160646',

		'tt4465564',

		'tt15352516',

		'tt8002382',

		'tt0119217',

		'tt12906784',

		'tt1392214',

		'tt2709692',

		'tt1234719',

		'tt2263944',

		'tt0120815',

		'tt5052474',

		'tt0095094',

		'tt0029583',

		'tt15009428',

		'tt6920084',

		'tt1454029',

		'tt1528100',

		'tt11116912',

		'tt11348542',

		'tt2911666',

		'tt21094994',

		'tt9019352',

		'tt15683734',

		'tt8760708',

		'tt0438097',

		'tt6264654',

		'tt0083658',

		'tt1229238',

		'tt0329670',

		'tt10092698',

		'tt0070047',

		'tt3385516',

		'tt0480249',

		'tt1320253',

		'tt21160106',

		'tt21028848',

		'tt13320622',

		'tt0387564',

		'tt5013056',

		'tt1104001',

		'tt12003946',

		'tt3766354',

		'tt0365748',

		'tt0142243',

		'tt0275847',

		'tt14456350',

		'tt30876838',

		'tt3819668',

		'tt0061852',

		'tt2562232',

		'tt6892018',

		'tt2333784',

		'tt2543164',

		'tt5848272',

		'tt1186367',

		'tt8332922',

		'tt0099685',

		'tt7286456',

		'tt8093700',

		'tt13235822',

		'tt0060196',

		'tt0075314',

		'tt1823672',

		'tt9308390',

		'tt0481499',

		'tt0091902',

		'tt2058673',

		'tt1267297',

		'tt28487871',

		'tt22687790',

		'tt0936501',

		'tt1277953',

		'tt29259099',

		'tt15679400',

		'tt0086267',

		'tt5433138',

		'tt1086772',

		'tt3896198',

		'tt1950186',

		'tt3065204',
		'tt0424095',
		'tt6723592',
		'tt0454921',
		'tt1285016',
		'tt2076822',
		'tt22488414',
		'tt11858890',
		'tt5635026',
		'tt6908274',
		'tt5598292',
		'tt2528814',
		'tt7653254',
		'tt16419074',
		'tt0338751',
		'tt1446192',
		'tt15978956',
		'tt1706593',
		'tt0120744',
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
