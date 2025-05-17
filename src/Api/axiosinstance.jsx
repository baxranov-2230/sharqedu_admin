import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};

axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token && token.access_token) {
        if (isTokenExpired(token.access_token)) {
            toast.error("Token muddati tugagan. Iltimos, qayta kiring.");
            window.location.href = "/login";
            return config;
        } else {
            config.headers.Authorization = `Bearer ${token.access_token}`;
        }
    } else {
        toast.error("Token mavjud emas. Iltimos, tizimga kiring.");
        window.location.href = "/login";
        return config;
    }

    return config;
}, Promise.reject);

export default axiosInstance;
