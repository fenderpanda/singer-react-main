import axios from "axios";
import oktaAuth from "./OktaService";
import i18next from "i18next";

const AxiosOkta = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
});

AxiosOkta.interceptors.request.use((config: any) => {
    if (!!oktaAuth) {
        config.headers.Authorization = `Bearer ${oktaAuth.getAccessToken()}`;
        config.headers['Accept-Language'] = i18next.language;

        return Promise.resolve(config);
    } else {
        return Promise.resolve(config);
    }
});

export default AxiosOkta