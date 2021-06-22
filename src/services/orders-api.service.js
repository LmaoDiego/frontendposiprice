import http from './http.common';

class OrdersApiService {
    getAll() {
        return http.get('/orders');
    }
    get(id) {
        return http.get(`/orders/${id}`);
    }

    create(data) {
        return http.post("/orders", data);
    }

    update(id, data) {
        return http.put(`/orders/${id}`, data);
    }

    delete(id) {
        return http.delete(`/orders/${id}`);
    }

    deleteAll() {
        return http.delete(`/orders`);
    }

    findByName(name) {
        return http.get(`/orders?name=${name}`);
    }
}

export default new OrdersApiService();