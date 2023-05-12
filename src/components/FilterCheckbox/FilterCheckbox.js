import { useState, useEffect } from "react";

function FilterCheckbox({ pathname, handleCheckbox }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (pathname === '/movies') {
            const storageIsShortMovie = (localStorage.getItem('isShortMovie')  === 'true') || false;
            setIsChecked(storageIsShortMovie);
        }
	}, []);

    function changeCheckbox() {
        setIsChecked(!isChecked);
        handleCheckbox(!isChecked);
    }


    return (
        <fieldset className="filter">
            <input className="filter__checkbox" type="checkbox" id="checkbox" checked={isChecked} onChange={changeCheckbox}></input>
            <label className="filter__label" htmlFor="checkbox">Короткометражки</label>
        </fieldset>
    );
}

export default FilterCheckbox;