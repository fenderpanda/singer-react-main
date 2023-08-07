import axios from "axios";
import i18next from "i18next";

const Axios = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
})

Axios.interceptors.request.use((config: any) => {
    config.headers['Accept-Language'] = i18next.language;

    return Promise.resolve(config);
})

Axios.interceptors.response.use((response: any) => {
    return response;
}, (error) => {
    if (error.code === "ERR_NETWORK" || error.response.status === 502) {
        window.location.href = "/error";
    }

    return Promise.reject(error);
})

export default Axios;