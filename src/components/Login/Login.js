import { useEffect } from "react";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import SignInAndSignUpForm from "../SignInAndSignUpForm/SignInAndSignUpForm";


function Login({ onLogin, errorText }) {

	const { handleChange, errors, isValid, setIsValid, values } = useFormAndValidation();

	useEffect(() => {
		setIsValid(false);
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		onLogin(values.email, values.password); 
	}

	return (
		<SignInAndSignUpForm 
		handleSubmit={handleSubmit} 
		title={"Рады видеть!"} 
		submitName={"Войти"} 
		question={"Ещё не зарегистрированы?"} 
		linkTo={"/signup"}
		linkText={"Регистрация"}
		isValid={isValid}
		errorText={errorText}
		>
			<label className="form__label" htmlFor="email">E-mail</label>
			<input className={`form__input ${errors.email ? "form__input_type_error" : ""}`} 
				id="email"
				name="email" 
				onChange={handleChange}
				value={values.email || ''} 
				autoComplete="email"
				type="email"
				placeholder="Введите email"
				required>
			</input>
			<p className="form__error">{errors.email}</p>
			<label className="form__label" htmlFor="password">Пароль</label>
			<input className={`form__input ${errors.password ? "form__input_type_error" : ""}`}
				id="password"
				name="password" 
				onChange={handleChange} 
				value={values.password || ''}
				autoComplete="new-password"
				type="password"
				placeholder="Введите пароль"
				minLength='8'
				maxLength='30'
				required>
			</input>
			<p className="form__error">{errors.password}</p>
		</SignInAndSignUpForm>
	);
}

export default Login;