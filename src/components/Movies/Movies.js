import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../../vendor/Preloader/Preloader"
import getMovies from '../../utils/MoviesApi';
import poster from '../../images/poster.jpg'
import { searchMessage } from '../../utils/constants';

import { useState, useEffect } from "react";

function Movies({ filterMovies, pathname, setIsSuccessfulSession, showInfoTooltip }) {
	const [isLoading, setIsLoading] = useState(false);
	const [moviesList, setMoviesList] = useState([]);
	const [errorText, setErrorText] = useState("");
	const [request, setRequest] = useState("");
	const [isShortMovie, setIsShortMovie] = useState("");

	useEffect(() => {

		const storageRequest = localStorage.getItem('request') || '';
		setRequest(storageRequest);

		const storageIsShortMovie = (localStorage.getItem('isShortMovie')  === 'true') || false;
		setIsShortMovie(storageIsShortMovie);
		
		const storageMovies = JSON.parse(localStorage.getItem('movies')) || [];
		storageMovies !== [] && setMoviesList(storageMovies);
		
	}, []);


	function correctMovies(movies) {
		return movies.map((card) => ({
			country: card.country || 'Неизвестно',
			director: card.director || 'Неизвестно',
			duration: card.duration || 'Неизвестно',
			year: card.year || 'Неизвестно',
			description: card.description || 'Неизвестно',
			image: `https://api.nomoreparties.co${card.image.url}` || poster,
			trailerLink: card.trailerLink || 'https://www.youtube.com/',
			thumbnail: `https://api.nomoreparties.co${card.image.url}` || poster,
			movieId: card.id,
			nameRU: card.nameRU || 'Неизвестно',
			nameEN: card.nameEN || 'Неизвестно',
		}))
	}

	function getFiltredMovies(request, isShortMovie) {
		setIsLoading(true);
		getMovies()
			.then((movies) => correctMovies(movies))
			.then((movies) => {
				if(/[\S]/.test(request)) {
					const filteredMovies = filterMovies(movies, request, isShortMovie);
					handleFilterMovies(filteredMovies);
				} else {
					setErrorText(searchMessage.EMPTY)
				}
			})
			.catch((error) => {
				setErrorText(searchMessage.ERROR);
				console.log(error);
			})
			.finally(() => setIsLoading(false));
	}

	function handleFilterMovies(movies) {
		setMoviesList(movies);
		localStorage.setItem('movies', JSON.stringify(movies));
		movies.length === 0
		? setErrorText(searchMessage.NOT_FOUND)
		: setErrorText('');
	}

	function handleSearch(request) {
		setRequest(request)
		localStorage.setItem('request', request);
		getFiltredMovies(request, isShortMovie);
	}

	function handleCheckbox(isShortMovie) {
		setIsShortMovie(isShortMovie);
		localStorage.setItem('isShortMovie', isShortMovie);
		getFiltredMovies(request, isShortMovie);
	}

	return (
	<main className="movies">
		<SearchForm handleSearch={handleSearch} handleCheckbox={handleCheckbox} pathname={pathname} />
		{isLoading
			? <Preloader /> 
			: <MoviesCardList moviesArr={moviesList} errorText={errorText} pathname={pathname} setIsSuccessfulSession={setIsSuccessfulSession} showInfoTooltip={showInfoTooltip}/>
		}
		
	</main>
	);
}

export default Movies;