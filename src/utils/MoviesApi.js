import { MOVIES_BASE_URL } from "./constants";

function checkResponse(res) {
    return res.ok 
        ? res.json() 
        : Promise.reject({
            status: res.status,
            message: res.statusText
        });
};

function request(options) {
    return fetch((`${MOVIES_BASE_URL}`), options).then(checkResponse);
}

function getMovies() {
    return request({
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
};

export default getMovies;
  