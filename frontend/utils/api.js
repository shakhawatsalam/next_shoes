import { API_URL, STRAPI_API_TOKEN } from "./urls.js";


export const fetchDataFromApi = async (endpoint) => {
    var options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer' + STRAPI_API_TOKEN
        },
    };

    const res = await fetch(`${API_URL}${endpoint}`, options);;
    const data = await res.json();

    return data;

};


const makePaymentRequest = async (endpoint, payload) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer' + STRAPI_API_TOKEN
        },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data
}


