import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import { VALIDATION } from "../../utils/constants";



function Profile({ signOut, updateCurrentProfile, isDisabled, clickButtonForEditInputs }) {
	const { currentUser } = useContext(CurrentUserContext);
  	const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation();

	useEffect(() => {
		setValues(currentUser);
		setIsValid(false);
	}, [currentUser]);


	function handleSubmit(e){
		e.preventDefault();
		updateCurrentProfile(values.name, values.email);
	}

	return (
	<section className="profile">
		<div className="profile__container">
			<h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
			<form className="profile__form" noValidate onSubmit={handleSubmit}>
				<fieldset className="profile__inputs">
					<div className="profile__input-wrapper">
						<label className="profile__label" htmlFor="name">Имя</label>
						<input className={`profile__input ${errors.name ? 'profile__input_type_error' : ""}`}
							id="name" 
							name="name" 
							value={values.name || ""} 
							disabled={isDisabled} 
							onChange={handleChange} 
							type="text"
							placeholder="Введите имя"
							minLength='2'
							maxLength='30'
							pattern={VALIDATION.name.pattern}
							required>
						</input>
					</div>
					<div className="profile__input-wrapper">
						<label className="profile__label" htmlFor="email">E-mail</label>
						<input className={`profile__input ${errors.email ? 'profile__input_type_error' : ""}`}
							id="email"
							name="email" 
							value={values.email || ""} 
							disabled={isDisabled} 
							onChange={handleChange} 
							autoComplete="email"
							type="email"
							placeholder="Введите email"
							required>
						</input>
					</div>
				</fieldset>	
				{isDisabled ? (
					<div className="profile__buttons-wrapper">
						<button className="profile__text-button" type="button" onClick={clickButtonForEditInputs}>Редактировать</button>
						<button className="profile__text-button profile__text-button_type_signout" type="button" onClick={signOut} >Выйти из аккаунта</button>
					</div>
				) : (
					<div className="profile__buttons-wrapper">
						{errors.name && (
							<p className="profile__error">{errors.name}</p>
						)}
						{errors.email && (
							<p className="profile__error">{errors.email}</p>
						)}
						<button className={`profile__submit-button ${!isValid ? "profile__submit-button_disabled" : ""}`} type="submit" disabled={!isValid}>Сохранить</button>
					</div>
				)}
			</form>	
		</div>
	</section>
	);
}

export default Profile;