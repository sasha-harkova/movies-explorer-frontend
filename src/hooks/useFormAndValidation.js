import {useState, useCallback, useContext} from 'react';
import { VALIDATION } from '../utils/constants';
import CurrentUserContext from "../contexts/CurrentUserContext";

function useFormAndValidation() {
	const [ values, setValues ] = useState({});
	const [ errors, setErrors ] = useState({});
	const [ isValid, setIsValid ] = useState(true);
	const { currentUser } = useContext(CurrentUserContext);


	const handleChange = (e) => {
		if (e.target.validity.patternMismatch) {
			if (e.target.name === 'name') {
				e.target.setCustomValidity(VALIDATION.name.message)
			} else if (e.target.name === 'email') {
				e.target.setCustomValidity(VALIDATION.email.message)
			}
		} else {
			e.target.setCustomValidity('')
		}

		const {name, value} = e.target
		setValues({...values, [name]: value });
		setErrors({...errors, [name]: e.target.validationMessage});
		setIsValid(e.target.closest('form').checkValidity());
	};

	const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
		setValues(newValues);
		setErrors(newErrors);
		setIsValid(newIsValid);
	}, [setValues, setErrors, setIsValid]);

	return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

export default useFormAndValidation;