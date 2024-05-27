import * as React from 'react'
import axios from 'axios'
import { AuthContext } from '../auth'

const baseUrl = (import.meta.env.MODE) === 'production' ? 'https://server-vn3egejaka-an.a.run.app/api/' : 'http://localhost:3301/api/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'authToken': localStorage.getItem('sessionToken')
    }
})

export { axiosInstance }