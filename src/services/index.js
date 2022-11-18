import axios from "axios";

const baseUrl = 'https://pib-server.herokuapp.com/api'
const api = {
    call : () => {
        return axios.create({
            baseURL : baseUrl
        })
    }
}

export default api;