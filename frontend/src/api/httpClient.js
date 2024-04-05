import axios from "axios";
import { toast } from "react-toastify";

const httpClient = axios.create({
    baseURL: "/api/v1",
});

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        let message = "";
        switch (error.request.status) {
            case 500:
                message = "Внутренняя ошибка сервера";
                break;
            case 404:
                message = "Ресурс не найден";
                break;
            default:
                message = "";
        }
        if (message) {
            toast.error(message);
        }
        return Promise.reject(error);
    }
);

export default httpClient;
