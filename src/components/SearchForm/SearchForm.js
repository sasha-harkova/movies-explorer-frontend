import { useContext, useEffect, useState } from "react";
import useFormAndValidation from "../../hooks/useFormAndValidation";


function SearchForm({setSearched}) {
  	const { handleChange, isValid, setValues, setIsValid } = useFormAndValidation();
    const [isFocus, setIsFocus]  = useState(false);

	useEffect(() => {
		setIsValid(false);
	}, []);

    function makeIsFocus() {
        setIsFocus(!isFocus);
    }

	function handleSubmit(e){
		e.preventDefault();
        setSearched(true);
	}

	return (
        <section className="search">
            <div className="search__container">
                <form className="search__form" noValidate onSubmit={handleSubmit}>
                    <fieldset className={`search__fieldset ${isFocus ? "search__fieldset_type_bold" : ""}`}>
                        <input className="search__input" 
                            name="search" 
                            onChange={handleChange}
                            // onFocus={makeIsFocus}
                            onFocus={(e) => setIsFocus(true)}
                            onBlur={(e) => setIsFocus(false)}
                            type="text"
                            placeholder="Фильм"
                            minLength='2'
                            maxLength='30'
                            required>
                        </input>
                        <button className={`search__submit-button ${!isValid ? "search__submit-button_disabled" : ""}`} type="submit" disabled={!isValid}>Поиск</button>
                    </fieldset>
                    <fieldset className="search__checkbox-fieldset">
                        <input className="search__checkbox" type="checkbox" id="checkbox"></input>
                        <label className="search__checkbox-label" htmlFor="checkbox">Короткометражки</label>
                    </fieldset>
                </form>	
                
            </div>
        </section>
	);
}

export default SearchForm;