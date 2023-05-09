import { useState, useContext, useEffect  } from "react";
import savedButtonIcon from "../../images/saved-button-icon.svg";
import deleteButtonIcon from "../../images/delete-button-icon.svg";
import { saveMovie, deleteMovie  } from "../../utils/MainApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function MoviesCard({ card, pathname, setIsSuccessfulSession, showInfoTooltip }) {
    const { nameRU, trailerLink, image, duration } = card;
    const [isSaved, setIsSaved] = useState(false);
    const [specialId, setSpecialId] = useState('');
    const { savedMovies, setSavedMovies } = useContext(CurrentUserContext);

    useEffect(() => {
        checkIsSaved(card);
    }, [isSaved]);

    function corretDuration(time) {
        return `${Math.trunc(time / 60)}ч ${time % 60}м`;
    }

    function handleSaveMovie() {
        saveMovie(card)
            .then((newMovie) => {
                setSpecialId(newMovie._id);
                setSavedMovies([...savedMovies, newMovie]);
                setIsSaved(true);
                setIsSuccessfulSession(true);
                showInfoTooltip('Фильм успешно сохранён!');
            })
            .catch((error) => {
                setIsSuccessfulSession(false);
                showInfoTooltip('Произошла ошибка. Попробуйте ещё раз.');
                console.log(error)
            })
    }

    function handleDeleteMovie() {
        deleteMovie(specialId)
            .then(() => {
                setSavedMovies(savedMovies.filter((film) => film._id !== specialId));
                setIsSaved(false);
                setIsSuccessfulSession(true);
                showInfoTooltip('Фильм успешно удалён из списка сохраненных!');
            })
            .catch((error) => {
                setIsSuccessfulSession(false);
                showInfoTooltip('Произошла ошибка. Попробуйте ещё раз.');
                console.log(error)
            })
    }

    function checkIsSaved(card) {
        const alreadySavedMovie = savedMovies.find((film) => film.movieId === card.movieId);
        if (alreadySavedMovie) {
            setIsSaved(true);
            setSpecialId(alreadySavedMovie._id);
        } else {
            setIsSaved(false);
            setSpecialId('');
        }
    };

	return (
	<div className="card">
        <div className="card__top-wrapper">
            <h3 className="card__title" title={nameRU}>{nameRU}</h3>
            <p className="card__duration">{corretDuration(duration)}</p>
        </div>
		<a className="card__trailer-link" href={trailerLink} target='_blank'>
            <img className="card__image" src={image} alt={`Постер к фильму "${nameRU}"`}/>
        </a>
        {pathname === '/movies' 
            ? <button className={`card__button ${isSaved ? 'card__button_active' : ''}`} onClick={isSaved ? handleDeleteMovie : handleSaveMovie}>{isSaved ? <img className="card__button-icon" src={savedButtonIcon} alt="галочка"/> : 'Сохранить'}</button>
            : <button className="card__button" onClick={handleDeleteMovie}><img className="card__button-icon" src={deleteButtonIcon} alt="крестик"/></button>
        }
       
	</div>
	);
}

export default MoviesCard;