import axios from "axios";

const baseUrl = 'https://pib-server.onrender.com/api'
const api = {
    call : () => {
        return axios.create({
            baseURL : baseUrl
        })
    }
}

export default api;