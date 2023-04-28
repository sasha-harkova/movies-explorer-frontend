import { Link } from "react-router-dom";
import photo from "../../../images/photo.jpg"

function AboutMe() {
	return (
	<section className="about-me">
		<div className="about-me__container">
			<h2 className="about-me__title">Студент</h2>
			<div className="about-me__flex">
				<div className="about-me__text-wrapper">
					<h3 className="about-me__name">Саша Харькова</h3>
					<h4 className="about-me__description">Фронтенд-разработчик</h4>
					<p className="about-me__story">По образованию я логист. После института я почти 4 года работала специалистом по международным автодоставкам сборных грузов.
						В какой-то момент поняла - не моё, не нравится. Решила попробовать себя в разработке, и фронтенд мне понравился больше всего. Сейчас я работаю в агентстве по
						разработке и продвижению сайтов. Каждый мой рабочий день теперь - сплошное удовольствие &#128578;
					</p>
					<Link className="about-me__link-to-github" to="https://github.com/sasha-harkova">Github</Link>
				</div>
				<img className="about-me__photo" src={photo} alt="Фото студента проекта"/>
			</div>
		</div>
	</section>
	);
}

export default AboutMe;