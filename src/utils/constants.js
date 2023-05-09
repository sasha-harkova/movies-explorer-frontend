export const MOVIES_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const MAIN_BASE_URL = "https://api.movies.search.harkova.nomoredomains.monster";
// export const MAIN_BASE_URL = "http://localhost:3001";

export const searchMessage = {
    EMPTY: 'Нужно ввести ключевое слово',
    NOT_FOUND: 'Ничего не найдено',
    NOT_SAVED: 'У вас нет сохранённых фильмов',
    ERROR: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
}

export const LOGIN_MESSAGES = {
    SUCCESS: 'Вы успешно вошли!',
    ERROR_401: 'Вы ввели неправильный email или пароль.',
    ERROR: 'При авторизации произошла ошибка. Попробуйте еще раз.',
}

export const REGISTER_MESSAGES = {
    ERROR_409: 'Пользователь с таким email уже существует.',
    ERROR: 'При регистрации произошла ошибка. Попробуйте еще раз.',
}

export const UPDATE_PROFILE_MESSAGES = {
    SUCCESS: 'Профиль успешно обновлён!',
    ERROR_409: 'Пользователь с таким email уже существует.',
    ERROR: 'При изменении профиля произошла ошибка. Попробуйте еще раз.',
}

export const VALIDATION = {
  name: {
    pattern: '^[\\sa-zA-Zа-яА-ЯёЁ-]+$',
    message: 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
  },
};

export const MOVIES_ADAPTATION = {
    CARDS_PER_PAGE: { MOBILE: 2, TABLET: 2, DESKTOP: 3 },
    SHOWED_CARDS: { MOBILE: 5, TABLET: 8, DESKTOP: 12 },
}