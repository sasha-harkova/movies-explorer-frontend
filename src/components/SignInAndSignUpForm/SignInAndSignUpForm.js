import { Link } from "react-router-dom";

function SignInAndSignUpForm({ children, title, handleSubmit, submitName, question, linkTo, linkText, isValid, errorText }) {

	return (
	    <section className="form">
            <div className="form__container">
            <Link className="form__logo" to="/" />
            <h1 className="form__greeting">{title}</h1>
            <form className="form__form" noValidate onSubmit={handleSubmit}>
                <fieldset className="form__inputs">
                    {children}
                </fieldset>
                <div className="form__bottom-wrapper">
                    <p className="form__error">{errorText}</p>
                    <button className={`form__submit-button ${!isValid ? "form__submit-button_disabled" : ""}`} type="submit" disabled={!isValid}>{submitName}</button>
                    <p className="form__question">{question} <span><Link className="form__link-to-signin" to={linkTo}>{linkText}</Link></span></p>
                </div>
            </form>	
            </div> 
        </section>
	);
}

export default SignInAndSignUpForm;