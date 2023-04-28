import { Link, useLocation } from "react-router-dom";
import Navigation from '../Navigation/Navigation'

function Header({ toggleAside, isClicked, isLoggedIn, pathname }) {

	// const { pathname } = useLocation();

	return (
	<header className="header">
		<div className="header__container">
		<Link className="header__logo" to="/" />
		{isLoggedIn ? (
			<>
				<div className="header__links-wrapper">
					<Navigation pathname={pathname} />
					<div className="header__buttons-wrapper">
					<Link className={`header__link header__link_type_profile ${pathname === "/profile" ? "header__link_active" : ""}`} to="/profile">Аккаунт</Link>
					</div>
				</div>
				<button className={`header__button ${isClicked && "header__button_active"}`} 
					type="button" onClick={toggleAside}>
				</button>
				<div className={`header__aside ${isClicked && "header__aside_visible"}`}>
					<Navigation pathname={pathname} toggleAside={toggleAside} />
					<div className="header__buttons-wrapper">
					<Link className="header__link header__link_type_profile" to="/profile" onClick={toggleAside} >Аккаунт</Link>
					</div>
				</div>
			</> 
		) : (
			<div className="header__buttons-wrapper">
				<Link className={`header__link header__link_type_signup ${pathname === "/signup" ? "header__link_active" : ""}`}  to="/signup">Регистрация</Link>
				<Link className={`header__link header__link_type_signin ${pathname === "/signin" ? "header__link_active" : ""}`} to="/signin">Войти</Link>
			</div>
		)}		
		</div>
	</header>
	);
}

export default Header;