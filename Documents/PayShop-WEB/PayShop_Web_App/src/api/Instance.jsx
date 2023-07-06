import axios from "axios";

const instance = axios.create({
   baseURL: import.meta.env.VITE_APP_BASE_URL,// Ganti dengan URL API Anda sendiri
});

export default instance;
