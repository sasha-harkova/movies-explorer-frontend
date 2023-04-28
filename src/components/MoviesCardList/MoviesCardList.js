import MoviesCard from "../MoviesCard/MoviesCard";
import moviesArr from "../../utils/moviesArr";
import { useState, useEffect  } from "react";

function MoviesCardList() {

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [cardsPerPage, setCardsPerPage] = useState(0);
	const [showedCards, setShowedCards] = useState(0);
	const [isShowMoreButton, setShowMoreButton] = useState(false);
	
	useEffect(() => {
		window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
	}, [])

	useEffect(() => {

		if (windowWidth >= 1280) {
			setCardsPerPage(3);
			setShowedCards(12);
			
		} else if (windowWidth >= 768) {
			setCardsPerPage(2);
			setShowedCards(8);
			
		} else {
			setCardsPerPage(2);
			setShowedCards(5);
		}

	}, [windowWidth, moviesArr.length]);


  	useEffect(() => {

		moviesArr.length > showedCards ? setShowMoreButton(true) : setShowMoreButton(false);

	}, [moviesArr.length, showedCards]);

	function handleShowMoreCards() {
		setShowedCards(showedCards + cardsPerPage);
	};

	return (
		<section className="movies-list">
			{moviesArr.length === 0 ?
				(<div className="movies-list__container">
					<p className="movies-list__empty-arr-text">Ничего не найдено</p>
				</div>)
			:
				(<div className="movies-list__container">
					<div className="movies-list__grid">
						{moviesArr.slice(0, showedCards).map((item) => (
							<MoviesCard
							card={item}
							key={item.movieId}
							/>
						))}
					</div>
					{isShowMoreButton ?
						<button className="movies-list__show-more" type="button" onClick={handleShowMoreCards}>Ещё</button>
						: ''
					}
					
				</div>)
			}
		</section>
	);
}

export default MoviesCardList;