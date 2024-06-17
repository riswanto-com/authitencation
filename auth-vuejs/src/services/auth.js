import axios from 'axios';

const API_URL = 'http://localhost:7070/api/';

export default {
    async register(user) {
        const response = await axios.post(`${API_URL}register`, user);
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    async login(user) {
        const response = await axios.post(`${API_URL}auth`, user);
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data.accessToken));
            localStorage.setItem('isLoggedIn',true)
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn')
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    },

    async getProfile(data) {
            const response = await axios.get(`${API_URL}profil`, {
                headers:  {
                    Authorization: 'Bearer '+data}
            });
            return response.data;
        
    }
};
