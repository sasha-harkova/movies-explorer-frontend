
import { useEffect } from "react";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import SignInAndSignUpForm from "../SignInAndSignUpForm/SignInAndSignUpForm";
import { VALIDATION } from "../../utils/constants";


function Register({ onRegister, errorText, setIsDisabled, isDisabled }) {

	const { handleChange, errors, isValid, setIsValid, values } = useFormAndValidation();

	useEffect(() => {
		setIsValid(false);
		setIsDisabled(false);
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		onRegister(values.name, values.email, values.password);
	}

	return (
		<SignInAndSignUpForm 
		handleSubmit={handleSubmit} 
		title={"Добро пожаловать!"} 
		submitName={"Зарегестрироваться"} 
		question={"Уже зарегистрированы?"} 
		linkTo={"/signin"}
		linkText={"Войти"}
		isValid={isValid}
		errorText={errorText}
		>
			<label className="form__label" htmlFor="name">Имя</label>
			<input className={`form__input ${errors.name ? "form__input_type_error" : ""}`}
				id="name"
				name="name"
				disabled={isDisabled} 
				onChange={handleChange} 
				value={values.name || ''}
				type="text"
				placeholder="Введите имя"
				minLength='2'
				maxLength='30'
				pattern={VALIDATION.name.pattern}
				required>
			</input>
			<p className="form__error">{errors.name}</p>
			<label className="form__label" htmlFor="email">E-mail</label>
			<input className={`form__input ${errors.email ? "form__input_type_error" : ""}`} 
				id="email"
				name="email"
				disabled={isDisabled} 
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

export default Register;