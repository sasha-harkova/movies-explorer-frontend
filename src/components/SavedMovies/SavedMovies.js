import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { searchMessage } from '../../utils/constants';
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { useState, useEffect, useContext } from "react";


function SavedMovies({ loggedIn, pathname, filterMovies, setIsSuccessfulSession, showInfoTooltip }) {
	const [moviesList, setMoviesList] = useState([]);
	const [errorText, setErrorText] = useState("");
	const [request, setRequest] = useState("");
	const [isShortMovie, setIsShortMovie] = useState("");
	const { savedMovies } = useContext(CurrentUserContext);

	useEffect(() => {
		if (savedMovies.length === 0) {
			setErrorText(searchMessage.NOT_SAVED)
		} setMoviesList(savedMovies);
    }, [loggedIn, savedMovies]);

	function handleFilterMovies(request, isShortMovie) {
		const filteredMovies = filterMovies(savedMovies, request, isShortMovie);
		setMoviesList(filteredMovies);
		filteredMovies.length === 0 ? setErrorText(searchMessage.NOT_FOUND) : setErrorText('');
	}

	function handleSearch(request) {
		setRequest(request);
		handleFilterMovies(request, isShortMovie);
	}

	function handleCheckbox(isShortMovie) {
		setIsShortMovie(isShortMovie);
		handleFilterMovies(request, isShortMovie);
	}

    return (
		<main className="saved-movies">
			<SearchForm handleSearch={handleSearch} pathname={pathname} handleCheckbox={handleCheckbox} />
			<MoviesCardList moviesArr={moviesList} errorText={errorText} pathname={pathname} setIsSuccessfulSession={setIsSuccessfulSession} showInfoTooltip={showInfoTooltip} />
		</main>
    );
}
  
export default SavedMovies;