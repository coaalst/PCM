import axios form 'axios'

export default () => {
    return axios.create({
        url: 'http://localhost:4000/'
    });
}