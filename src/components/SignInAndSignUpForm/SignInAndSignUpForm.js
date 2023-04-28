import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function SignInAndSignUpForm({ pathname, title, handleSubmit, submitName, question, linkTo, linkText }) {

	const { handleChange, errors, isValid, setIsValid } = useFormAndValidation();

	useEffect(() => {
		setIsValid(false);
	}, []);

	return (
	    <section className="form">
            <div className="form__container">
            <Link className="form__logo" to="/" />
            <h1 className="form__greeting">{title}</h1>
            <form className="form__form" noValidate onSubmit={handleSubmit}>
                <fieldset className="form__inputs">
                    
                    {pathname === "/signup" && (
                        <>
                            <label className="form__label" htmlFor="name">Имя</label>
                            <input className={`form__input ${errors.name ? "form__input_type_error" : ""}`}
                                id="name"
                                name="name" 
                                onChange={handleChange} 
                                type="text"
                                placeholder="Введите имя"
                                minLength='2'
                                maxLength='30'
                                pattern='^[\\sa-zA-Zа-яА-ЯёЁ-]+$'
                                required>
                            </input>
                            <p className="form__error">{errors.name}</p>
                        </>
                    )}
                    <label className="form__label" htmlFor="email">E-mail</label>
                    <input className={`form__input ${errors.email ? "form__input_type_error" : ""}`} 
                        id="email"
                        name="email" 
                        onChange={handleChange} 
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
                        autoComplete="new-password"
                        type="password"
                        placeholder="Введите пароль"
                        minLength='8'
                        maxLength='30'
                        required>
                    </input>
                    <p className="form__error">{errors.password}</p>
                </fieldset>
                <button className={`form__submit-button ${!isValid ? "form__submit-button_disabled" : ""}`} type="submit" disabled={!isValid}>{submitName}</button>
                <p className="form__question">{question} <span><Link className="form__link-to-signin" to={linkTo}>{linkText}</Link></span></p>
            </form>	
            </div> 
        </section>
	);
}

export default SignInAndSignUpForm;