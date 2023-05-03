import {useState, useCallback} from 'react';

function useFormAndValidation() {
	const [ values, setValues ] = useState({});
	const [ errors, setErrors ] = useState({});
	const [ isValid, setIsValid ] = useState(true);



	const handleChange = (e) => {
		if (e.target.validity.patternMismatch) {
			e.target.setCustomValidity('Имя может содержать только латиницу, кириллицу, пробел или дефис')
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