import MoviesCard from "../MoviesCard/MoviesCard";
import { MOVIES_ADAPTATION } from "../../utils/constants";

import { useState, useEffect  } from "react";

function MoviesCardList({ moviesArr, errorText, pathname, setIsSuccessfulSession, showInfoTooltip }) {

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [cardsPerPage, setCardsPerPage] = useState(0);
	const [showedCards, setShowedCards] = useState(0);
	const [isShowMoreButton, setShowMoreButton] = useState(false);
	
	
	useEffect(() => {
		window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
	}, [])

	useEffect(() => {

		if (pathname === '/movies' ) {
			if (windowWidth >= 1280) {
				setCardsPerPage(MOVIES_ADAPTATION.CARDS_PER_PAGE.DESKTOP);
				setShowedCards(MOVIES_ADAPTATION.SHOWED_CARDS.DESKTOP);
				
			} else if (windowWidth >= 768) {
				setCardsPerPage(MOVIES_ADAPTATION.CARDS_PER_PAGE.TABLET);
				setShowedCards(MOVIES_ADAPTATION.SHOWED_CARDS.TABLET);
				
			} else {
				setCardsPerPage(MOVIES_ADAPTATION.CARDS_PER_PAGE.MOBILE);
				setShowedCards(MOVIES_ADAPTATION.SHOWED_CARDS.MOBILE);
			}
		} else {
			setShowedCards(moviesArr.length)
		}
		
	}, [windowWidth, moviesArr.length]);


  	useEffect(() => {

		if (pathname === '/movies' ) {
			moviesArr.length > showedCards ? setShowMoreButton(true) : setShowMoreButton(false);
		} else {
			setShowMoreButton(false);
		}

	}, [moviesArr.length, showedCards]);

	function handleShowMoreCards() {
		setShowedCards(showedCards + cardsPerPage);
	};

	return (
		<section className="movies-list">
			{errorText
				? 
				<div className="movies-list__container">
					<p className="movies-list__error-text">{errorText}</p>
				</div>
				: 
				<div className="movies-list__container">
					<div className="movies-list__grid">
						{moviesArr.slice(0, showedCards).map((card) => (
							<MoviesCard
							card={card}
							key={card.movieId}
							pathname={pathname}
							setIsSuccessfulSession={setIsSuccessfulSession} 
							showInfoTooltip={showInfoTooltip}
							/>
						))}
					</div>
					{isShowMoreButton ?
						<button className="movies-list__show-more" type="button" onClick={handleShowMoreCards}>Ещё</button>
						: ''
					}
					
				</div>
			}
		</section>
	);
}

export default MoviesCardList;