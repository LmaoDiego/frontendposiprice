import http from './http.common';

class ProfileApiService {
    getAll() {
        return http.get('/profile');
    }
    get(id) {
        return http.get(`/profile/${id}`);
    }

    create(data) {
        return http.post("/profile", data);
    }

    update(id, data) {
        return http.put(`/profile/${id}`, data);
    }

    delete(id) {
        return http.delete(`/profile/${id}`);
    }

    deleteAll() {
        return http.delete(`/profile`);
    }

    findByName(name) {
        return http.get(`/profile?name=${name}`);
    }
}

export default new ProfileApiService();
