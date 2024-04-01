import axios from "axios";

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

export default httpClient;
