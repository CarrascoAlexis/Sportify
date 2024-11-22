import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000"
    // baseURL: "http://85.215.169.18:5000"
})

export default axiosInstance;