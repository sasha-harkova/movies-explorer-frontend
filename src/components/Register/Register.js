import SignInAndSignUpForm from "../SignInAndSignUpForm/SignInAndSignUpForm";


function Register({ pathname, onRegister }) {

	function handleSubmit(e) {
		e.preventDefault();
		onRegister();
	}

	return (
		<SignInAndSignUpForm 
		pathname={pathname} 
		handleSubmit={handleSubmit} 
		title={"Добро пожаловать!"} 
		submitName={"Зарегестрироваться"} 
		question={"Уже зарегистрированы?"} 
		linkTo={"/signin"}
		linkText={"Войти"}
		/>
		
	);
}

export default Register;