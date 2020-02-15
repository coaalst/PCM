import api form '@/service/api'

export default {
    register(credentials) {
        return api().post('register', credentials);
    }
}