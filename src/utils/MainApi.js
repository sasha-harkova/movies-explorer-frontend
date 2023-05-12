import { MAIN_BASE_URL } from "./constants";

function checkResponse(res) {
    return res.ok 
        ? res.json() 
        : Promise.reject({
            status: res.status,
            message: res.statusText
        });
};

function request(endPoint, options) {
    return fetch((`${MAIN_BASE_URL}/${endPoint}`), options).then(checkResponse);
}

function register(name, email, password) {
    return request("signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });
};

function login(email, password) {
    return request("signin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
};
  
function checkToken(token) {
    return request("users/me", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

function getCurrenUser(token) {
    return request("users/me", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
    })
}

function updateProfile(name, email) {
    return request("users/me", {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ name, email }),
    })
}

function saveMovie(movie) {
    return request("movies", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(movie),
    })
}

function getSavedMovies(token) {
    return request("movies", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
    })
}

function deleteMovie(id) {
    return request(`movies/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    })
}

export { register, login, checkToken, getCurrenUser, updateProfile, saveMovie, getSavedMovies, deleteMovie };