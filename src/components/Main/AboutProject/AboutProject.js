function AboutProject() {
    return (
      <section className="about-project">
        <div className="about-project__container">
            <h2 className="about-project__title" id="about-project">О проекте</h2>
            <div className="about-project__description-wrapper">
                <div className="about-project__description-item">
                    <h3 className="about-project__description-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__description-item">
                    <h3 className="about-project__description-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__timing">
                <div className="about-project__timing-item about-project__timing-item_type_black">1 неделя</div>
                <div className="about-project__timing-item about-project__timing-item_type_grey">4 недели</div>
                <div className="about-project__timing-item about-project__timing-item_type_transparent">Back-end</div>
                <div className="about-project__timing-item about-project__timing-item_type_transparent">Front-end</div>
            </div>
        </div>
      </section>
    );
  }
  
  export default AboutProject;