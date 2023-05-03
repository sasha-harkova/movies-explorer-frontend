import { Link } from "react-router-dom";

function Portfolio() {
	return (
	<section className="portfolio">
		<div className="portfolio__container">
			<h2 className="portfolio__title">Портфолио</h2>
			<ul className="portfolio__list">
				<li className="portfolio__item">
					<Link className="portfolio__link" to="https://loner789.github.io/lubimovka_2.0/index.html" target="_blank">Лендинг "Любимовка"</Link>
				</li>
				<li className="portfolio__item">
					<Link className="portfolio__link" to="https://mesto.harkova.nomoredomains.work" target="_blank">Fullstack приложение "Mesto"</Link>
				</li>
				<li className="portfolio__item">
					<Link className="portfolio__link" to="https://sasha-harkova.github.io/delivery/" target="_blank">Приложение "Доставка"</Link>
				</li>
			</ul>
		</div>
	</section>
	);
}

export default Portfolio;