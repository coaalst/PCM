import api from '@/service/api'

export default {
    register(credentials) {
        return api().post('profiles/register', credentials);
    }
}