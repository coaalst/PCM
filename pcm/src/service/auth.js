import api from '@/service/api'

export default {
    register(credentials) {
        return api().post('/profiles/register', credentials);
    },
    login(credentials) {
        return api().post('/profiles/login', credentials);
    }
}