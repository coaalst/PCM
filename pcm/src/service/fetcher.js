// Servis za hvatnje podataka sa servera
import api from '@/service/api'

export default {
    fetchClassrooms() {
        return api().get('/classroom/');
    },
    fetchPC() {
        return api().get('/pc/');
    }
}