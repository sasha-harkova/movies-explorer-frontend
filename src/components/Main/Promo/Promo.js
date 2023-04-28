import headingImage from '../../../images/heading-image.svg'

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text-wrapper">
        <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__description">
            Листайте ниже, чтобы узнать больше про этот проект и его
            создателя.
        </p>
        </div>
        <img className="promo__image" src={headingImage} alt="глобус из буквенных символов" />
      </div>
    </section>
  );
}

export default Promo;
