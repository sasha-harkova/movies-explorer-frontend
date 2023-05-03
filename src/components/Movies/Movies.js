import Preloader from '../../vendor/Preloader/Preloader'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { useState } from "react";



function Movies() {

	const [searched, setSearched] = useState(false);

	function onSearch() {
		setSearched(true);
	}

	return (
	<main className="movies">
		<SearchForm setSearched={onSearch}/>
		<MoviesCardList />
		
	</main>
	);
}

export default Movies;