import axios from "axios"
const API_BASE_URL = "http://localhost:8080/auth"

export const AuthService = {
    async login(username, password) {
        const response = await axios.post(`${API_BASE_URL}/login`, {username, password});
        return response.data;
    },
    async register(user) {
        const response = await axios.post(`${API_BASE_URL}/users/signup`, {...user});
        return response.data;
    }
}