import axios from "axios"

const API_BASE_URL = "http://localhost:8080/users"

export const UserService = {
    async register(user) {
        const response = await axios.post(`${API_BASE_URL}/signup`, {...user});
        return response.data;
    }
}