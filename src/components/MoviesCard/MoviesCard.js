import { useState  } from "react";
import { useLocation } from "react-router-dom";
import savedButtonIcon from "../../images/saved-button-icon.svg";
import deleteButtonIcon from "../../images/delete-button-icon.svg";

function MoviesCard({ card }) {
    const { nameRU, trailerLink, thumbnail, duration } = card;
    const [isSaved, setIsSaved] = useState(false);

    const { pathname } = useLocation();

    function saveMovie() {
        setIsSaved(!isSaved);
    }

    function deleteMovie(evt) {
        evt.target.closest('.card').remove();
    }
    

	return (
	<div className="card">
        <div className="card__top-wrapper">
            <h3 className="card__title">{nameRU}</h3>
            <p className="card__duration">{duration} минут</p>
        </div>
		<a className="card__trailer-link" href={trailerLink} target='_blank'>
            <img className="card__image" src={thumbnail} alt={`Постер к фильму "${nameRU}"`}/>
        </a>
        {pathname === 'movies' 
            ? <button className={`card__button ${isSaved && 'card__button_active'}`} onClick={saveMovie}>{isSaved ? <img class="card__button-icon" src={savedButtonIcon} alt="крестик"/> : 'Сохранить'}</button>
            : <button className="card__button" onClick={(evt) => deleteMovie(evt)}><img class="card__button-icon" src={deleteButtonIcon} alt="крестик"/></button>
        }
       
	</div>
	);
}

export default MoviesCard;