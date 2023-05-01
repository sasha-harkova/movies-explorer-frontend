import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

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

import CurrentUserContext from "../../contexts/CurrentUserContext";


function App() {
const [currentUser, setUserInfo] = useState({ name: "Test", email: "qwerty@qwerty.ru"});
const [isClicked, setIsClicked] = useState(false);
const [loggedIn, setLoggedIn] = useState(true);
const [currentYear, setCurrentYear] = useState("");
const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
const [isSuccessfulSession, setIsSuccessfulSession] = useState(false);

const navigate = useNavigate();
const { pathname } = useLocation();


useEffect(() => {
	const year = new Date().getFullYear();
	setCurrentYear(year);

}, []);

function toggleAside() {
	setIsClicked(!isClicked);
	if (!isClicked) {
		document.querySelector('html').classList.add('not-scroll');
	} else {
		document.querySelector('html').classList.remove('not-scroll');
	}
}

function showInfoTooltip() {
	setIsInfoTooltipOpen(true);
	window.setTimeout(() => setIsInfoTooltipOpen(false), 2000);
}

function signOut() {
	setLoggedIn(false);
    navigate("/", { replace: true });
}

function onLogin() {
	setLoggedIn(true);
	navigate("/", { replace: true });
	showInfoTooltip();
	setIsSuccessfulSession(true);
}

function onRegister() {
	navigate("/signin", { replace: true });
	showInfoTooltip();
	setIsSuccessfulSession(true);
}


return (
	<CurrentUserContext.Provider value={currentUser}>
		<div className="page">
			<Routes>
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
							<Movies />
							<Footer currentYear={currentYear}/>
						</> 
					</ProtectedRoute>         
				} />
				<Route path="/saved-movies" element={
					<ProtectedRoute loggedIn={loggedIn}>
						<>
							<Header toggleAside={toggleAside} isClicked={isClicked} isLoggedIn={loggedIn} pathname={pathname} />
							<SavedMovies />
							<Footer currentYear={currentYear}/>
						</> 
					</ProtectedRoute>           
				} />
				<Route path="/profile" element={
					<ProtectedRoute loggedIn={loggedIn}>
						<>
							<Header toggleAside={toggleAside} isClicked={isClicked} isLoggedIn={loggedIn} pathname={pathname} />
							<Profile signOut={signOut} />
						</>
					</ProtectedRoute>            
				} />
				<Route path="/signin" element={
					<Login pathname={pathname} onLogin={onLogin} />          
				} />
				<Route path="/signup" element={
					<Register pathname={pathname} onRegister={onRegister} />          
				} />
				<Route path="*" element={
					<NotFound />          
				} />
			</Routes>
			<InfoTooltip pathname={pathname} isInfoTooltipOpen={isInfoTooltipOpen} isSuccessfulSession={isSuccessfulSession}/> 
		</div>
	</CurrentUserContext.Provider>
);
}

export default App;
