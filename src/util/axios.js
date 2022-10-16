import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}`,
});

export const client = (method, url, options) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        "Content-Type": "application/json",
    };
    return instance({
        method,
        url,
        headers,
        ...options,
    });
};

export const noTokenClient = (method, url, options) => {
    const headers = {
        "Content-Type": "application/json",
    };
    return instance({
        method,
        url,
        headers,
        ...options,
    });
};
