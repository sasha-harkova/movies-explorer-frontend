import { Link } from "react-router-dom";

function Navigation({ pathname, toggleAside }) {

return (
	<nav className="navigation">
	<ul className="navigation__list">
		<li className="navigation__item navigation__item_type_aside">
			<Link className={`navigation__link ${pathname === "/" ? "navigation__link_active" : ""}`} to="/" onClick={toggleAside} >Главная</Link>
		</li>
		<li className="navigation__item">
			<Link className={`navigation__link ${pathname === "/movies" ? "navigation__link_active" : ""}`} to="/movies" onClick={toggleAside} >Фильмы</Link>
		</li>
		<li className="navigation__item">
			<Link className={`navigation__link ${pathname === "/saved-movies" ? "navigation__link_active" : ""}`} to="/saved-movies" onClick={toggleAside} >Сохранённые фильмы</Link>
		</li>
	</ul>
	</nav>
);
}

export default Navigation;