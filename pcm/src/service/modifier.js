// Servis za modifikaciju podataka na serveru
import api from '@/service/api'

export default {
    deletec(id) {
        var req = {
            id: id
        }
        console.log(req)
        return api().post('/classroom/delete', req);
    },
    addc(name) {
        var req = {
            name: name
        }
        console.log(req)
        return api().post('/classroom/add', req);
    },
    edit(credentials) {
        return api().post('/classroom/edit', credentials);
    },
    deletep(credentials) {
        return api().post('/pc/delete', credentials);
    },
    addp(credentials) {
        return api().post('/pc/add', credentials);
    },
    editp(credentials) {
        return api().post('/pc/edit', credentials);
    },
}