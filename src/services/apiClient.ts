import axios from "axios"

const api = axios.create({
    baseURL:"https://avaliame.herokuapp.com/",
})

export default api