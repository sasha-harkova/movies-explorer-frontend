import SignInAndSignUpForm from "../SignInAndSignUpForm/SignInAndSignUpForm";


function Login({ pathname, onLogin }) {

	function handleSubmit(e) {
		e.preventDefault();
		onLogin();
	}

	return (
		<SignInAndSignUpForm 
		pathname={pathname} 
		handleSubmit={handleSubmit} 
		title={"Рады видеть!"} 
		submitName={"Войти"} 
		question={"Ещё не зарегистрированы?"} 
		linkTo={"/signup"}
		linkText={"Регистрация"}
		/>
	);
}

export default Login;