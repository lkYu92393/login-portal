import axios from 'axios'

const baseUrl = (import.meta.env.MODE) === 'production' ? 'http://localhost:3301/api/' : 'http://localhost:3301/api/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'authToken': localStorage.getItem('sessionToken')
    }
})

axiosInstance.interceptors.response.use(
    (res) => res,
    (rej) => {
        if (rej.code === 'ERR_NETWORK') {
            console.log(`Cannot connect to server.`)
        }
        return rej
    }
)

export { axiosInstance }