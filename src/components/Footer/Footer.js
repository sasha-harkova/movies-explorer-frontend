import { Link } from "react-router-dom";

function Footer({ currentYear }) {
	return (
	<footer className="footer">
		<div className="footer__container">
		<p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
		<div className="footer__wrapper">
			<p className="footer__date">© {currentYear}</p>
			<nav className="footer__nav">
			<ul className="footer__nav-list">
				<li className="footer__nav-item">
				<Link className="footer__link" to="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</Link>
				</li>
				<li className="footer__nav-item">
				<Link className="footer__link" to="https://github.com/sasha-harkova" target="_blank">Github</Link>
				</li>
			</ul>
			</nav>
		</div>
		</div>
	</footer>
	);
}

export default Footer;