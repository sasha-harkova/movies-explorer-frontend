function InfoTooltip({ isInfoTooltipOpen, isSuccessfulSession, tooltipText }) {

    return (
    <div className={`tooltip ${isInfoTooltipOpen ? "tooltip_opened" : ""}`}>
        <div className="tooltip__container">
            {isSuccessfulSession 
                ? <p className="tooltip__text tooltip__text_type_success">{tooltipText}</p>
                : <p className="tooltip__text tooltip__text_type_error">{tooltipText}</p>
            }   
        </div>
    </div>
    );
}

export default InfoTooltip;