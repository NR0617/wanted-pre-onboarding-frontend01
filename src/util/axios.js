import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}`,
});

export const client = (method, url, options) => {
    // header 옵션이나 에러 처리는 이부분에서 정의
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
    // header 옵션이나 에러 처리는 이부분에서 정의
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
