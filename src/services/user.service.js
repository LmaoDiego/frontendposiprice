// user.service.js
// User Data Service

import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = 'https://localhost:5001/api/users';

class UserService {
    getAll() {
        console.log(authHeader());
        return axios.get(API_URL, { headers: authHeader() });
    }
}

export default new UserService();
