function InfoTooltip({ isInfoTooltipOpen, isSuccessfulSession, pathname }) {

    return (
    <div className={`tooltip ${isInfoTooltipOpen ? "tooltip_opened" : ""}`}>
        <div className="tooltip__container">
            {isSuccessfulSession 
                ? <p className="tooltip__text tooltip__text_type_success">{`Вы успешно ${pathname === "/signin" ? "зарегистрировались" : "авторизовались"}!`}</p>
                : <p className="tooltip__text tooltip__text_type_error">Что-то пошло не так! Попробуйте ещё раз.</p>
            }   
        </div>
    </div>
    );
}

export default InfoTooltip;