import { useNavigate } from "react-router-dom";

function NotFound() {
const navigate = useNavigate();

return (
	<main className="not-found">
	<div className="not-found__container">
		<div className="not-found__text-wrapper">
		<h1 className="not-found__error">404</h1>
		<p className="not-found__text">Страница не найдена</p>
		</div>
		<button className="not-found__return" onClick={() => navigate(-1)} type="button">Назад</button>
	</div>
	
	
	</main>
);
}

export default NotFound;