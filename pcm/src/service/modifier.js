// Servis za modifikaciju podataka na serveru
import api from '@/service/api'

export default {
    delete(id) {
        var req = {
            id: id
        }
        console.log(req)
        return api().post('/classroom/delete', req);
    },
    add(credentials) {
        return api().get('/classroom/add', credentials);
    },
    edit(credentials) {
        return api().post('/classroom/edit', credentials);
    },
    deletep(credentials) {
        return api().post('/pc/delete', credentials);
    },
    addp(credentials) {
        return api().get('/pc/add', credentials);
    },
    editp(credentials) {
        return api().post('/pc/edit', credentials);
    },
}