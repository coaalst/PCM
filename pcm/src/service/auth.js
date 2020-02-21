// Servis za autentifikaciju
import api from '@/service/api'

export default {

    register(credentials) {
        return api().post('/profiles/register', credentials);
    },
    login(credentials) {
        return api().post('/profiles/login', credentials);
    },
    logout() {
        return api().post('/profiles/logout');
    }
}