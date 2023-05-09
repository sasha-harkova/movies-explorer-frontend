import { useEffect, useState } from "react";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";


function SearchForm({handleSearch, handleCheckbox, pathname}) {
  	const { handleChange, isValid, setValues, setIsValid, values } = useFormAndValidation();
    const [isFocus, setIsFocus]  = useState(false);

	useEffect(() => {
        setIsValid(false);

        if (pathname === '/movies') {
            const storageRequest = localStorage.getItem('request') || '';
            
            if (storageRequest !== '') {
                setIsValid(true);
                setValues({search: storageRequest});
            }
        }
	}, []);


	function handleSubmit(e){
		e.preventDefault();
        handleSearch(values.search);
	}

	return (
        <section className="search">
            <div className="search__container">
                <form className="search__form" noValidate onSubmit={handleSubmit}>
                    <fieldset className={`search__fieldset ${isFocus ? "search__fieldset_type_bold" : ""}`}>
                        <input className="search__input"
                            id="search"
                            name="search" 
                            onChange={handleChange}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            type="text"
                            placeholder="Фильм"
                            value={values.search || ""}>
                        </input>
                        <button className={`search__submit-button ${!isValid ? "search__submit-button_disabled" : ""}`} type="submit" disabled={!isValid}>Поиск</button>
                    </fieldset>
                    <FilterCheckbox pathname={pathname} handleCheckbox={handleCheckbox} />
                </form>	
                
            </div>
        </section>
	);
}

export default SearchForm;