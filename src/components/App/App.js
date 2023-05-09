import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'
import Footer from '../Footer/Footer';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Preloader from "../../vendor/Preloader/Preloader";
import { register, login, checkToken, getCurrenUser, updateProfile, getSavedMovies  } from "../../utils/MainApi"; 
import { LOGIN_MESSAGES, REGISTER_MESSAGES, UPDATE_PROFILE_MESSAGES } from "../../utils/constants";
import CurrentUserContext from "../../contexts/CurrentUserContext";


function App() {

	const [currentUser, setCurrentUser] = useState({});
	const [isClicked, setIsClicked] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentYear, setCurrentYear] = useState("");
	const [savedMovies, setSavedMovies] = useState([]);
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
	const [isSuccessfulSession, setIsSuccessfulSession] = useState(false);
	const [tooltipText, setTooltipText] = useState("");
	const [errorText, setErrorText] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		const year = new Date().getFullYear();
		setCurrentYear(year);

		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			checkToken(jwt)
				.then((user) => {					
					setCurrentUser(user);
					setLoggedIn(true);
				})
				.catch((error) => console.log(`Ошибка при получении информации о пользователе: ${error.status, error.statusText}`))
				.finally(() => setIsLoading(false))

			getSavedMovies(jwt)
				.then((movies) => setSavedMovies(movies))
				.catch((error) => console.log(`Ошибка при получении информации о сохраненных фильмах: ${error.status, error.statusText}`))
				.finally(() => setIsLoading(false))

		} else {
			setIsLoading(false)
		}

	}, []);

	useEffect(() => {
		setErrorText("");
	}, [navigate]);

	useEffect(() => {
		
		if (loggedIn) {
			const jwt = localStorage.getItem("jwt");
			Promise.all([getSavedMovies(jwt), getCurrenUser(jwt)])
				.then(([movies, user]) => {
					setSavedMovies(movies);
					setCurrentUser(user);
				})
				.catch((error) => console.log(error))
				.finally(() => {
					setIsLoading(false);
				});
		}

	}, [loggedIn]);

	function toggleAside() {
		setIsClicked(!isClicked);
		if (!isClicked) {
			document.querySelector('html').classList.add('not-scroll');
		} else {
			document.querySelector('html').classList.remove('not-scroll');
		}
	}

	function clickButtonForEditInputs() {
		setIsDisabled(false);
	}

	function showInfoTooltip(text) {
		setTooltipText(text);
		setIsInfoTooltipOpen(true);
		window.setTimeout(() => setIsInfoTooltipOpen(false), 4000);
	}

	function signOut() {
		localStorage.removeItem("jwt");
		localStorage.removeItem("request");
		localStorage.removeItem("isShortMovie");
		localStorage.removeItem("movies");
		setLoggedIn(false);
		navigate("/", { replace: true });
	}

	function onLogin(email, password) {
		return login(email, password)
			.then((data) => {
				if (data.token) {
					localStorage.setItem("jwt", data.token);
				}
				setLoggedIn(true);
				navigate("/movies", { replace: true });
				setIsSuccessfulSession(true);
				showInfoTooltip(LOGIN_MESSAGES.SUCCESS);
			})
			.catch((error) => {
				setIsSuccessfulSession(false);
				error.status === 401
				? setErrorText(LOGIN_MESSAGES.ERROR_401)
				: setErrorText(LOGIN_MESSAGES.ERROR)
				console.log(error);
			})
	}

	function onRegister(name, email, password) {
		return register(name, email, password) 
			.then(() => {
				onLogin(email, password);
			})
			.catch((error) => {
				setIsSuccessfulSession(false);
				error.status === 409 
				? setErrorText(REGISTER_MESSAGES.ERROR_409)
				: setErrorText(REGISTER_MESSAGES.ERROR)
				console.log(error);
			})
	}

	function updateCurrentProfile(name, email) {
		return updateProfile(name, email)
			.then((user) => {
				setCurrentUser(user);
				setIsSuccessfulSession(true);
				setIsDisabled(true);
				showInfoTooltip(UPDATE_PROFILE_MESSAGES.SUCCESS);
			})
			.catch((error) => {
				setIsSuccessfulSession(false);
				setIsDisabled(false);
				error.status === 409
				? showInfoTooltip(UPDATE_PROFILE_MESSAGES.ERROR_409)
				: showInfoTooltip(UPDATE_PROFILE_MESSAGES.ERROR)
				console.log(error);
			})
	}

	function filterMovies(movies, request, isShortMovie) {
		request = request.toLowerCase().trim();
		const searchedMovies = movies.filter((movie) => {
			const rusName = movie.nameRU && movie.nameRU.toLowerCase().trim();
			const engName = movie.nameEN && movie.nameEN.toLowerCase().trim();
			return (rusName.match(request)) || (engName.match(request));
		});

		if(isShortMovie) {
			return searchedMovies.filter((movie) => movie.duration <= 40);
		}

		return searchedMovies;
	}


	return (
		<CurrentUserContext.Provider value={{currentUser, setCurrentUser, savedMovies, setSavedMovies}}>
			<div className="page">
				{isLoading 
				? <Preloader />
				: <Routes>
					<Route path="/" element={
						<>
							<Header toggleAside={toggleAside} isClicked={isClicked} isLoggedIn={loggedIn} pathname={pathname} />
							<Main />
							<Footer currentYear={currentYear}/>
						</>            
					}/>

					<Route path="/movies" element={
						<ProtectedRoute loggedIn={loggedIn}>
							<>
								<Header toggleAside={toggleAside} isClicked={isClicked} isLoggedIn={loggedIn} pathname={pathname} />
								<Movies filterMovies={filterMovies} pathname={pathname} setIsSuccessfulSession={setIsSuccessfulSession} showInfoTooltip={showInfoTooltip}/>
								<Footer currentYear={currentYear}/>
							</> 
						</ProtectedRoute>         
					} />
					<Route path="/saved-movies" element={
						<ProtectedRoute loggedIn={loggedIn}>
							<>
								<Header toggleAside={toggleAside} isClicked={isClicked} isLoggedIn={loggedIn} pathname={pathname} />
								<SavedMovies loggedIn={loggedIn} pathname={pathname} filterMovies={filterMovies} setIsSuccessfulSession={setIsSuccessfulSession} showInfoTooltip={showInfoTooltip} />
								<Footer currentYear={currentYear}/>
							</> 
						</ProtectedRoute>           
					} />
					<Route path="/profile" element={
						<ProtectedRoute loggedIn={loggedIn}>
							<>
								<Header toggleAside={toggleAside} isClicked={isClicked} isLoggedIn={loggedIn} pathname={pathname} />
								<Profile signOut={signOut} updateCurrentProfile={updateCurrentProfile} isDisabled={isDisabled} clickButtonForEditInputs={clickButtonForEditInputs}/>
							</>
						</ProtectedRoute>            
					} />
					<Route path="/signin" element={
						loggedIn 
						? <Navigate to='/' />
						: <Login onLogin={onLogin} errorText={errorText} />
            		} />
					<Route path="/signup" element={
						loggedIn 
						? <Navigate to='/' />
						: <Register onRegister={onRegister} errorText={errorText} />          
					} />
					<Route path="*" element={
						<NotFound />          
					} />
				</Routes>
				}
				<InfoTooltip isInfoTooltipOpen={isInfoTooltipOpen} isSuccessfulSession={isSuccessfulSession} tooltipText={tooltipText}/> 
				
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
