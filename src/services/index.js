import axios from "axios";

const baseUrl = 'http://localhost:3000/api'
const api = {
    call : () => {
        return axios.create({
            baseURL : baseUrl
        })
    }
}

export default api;