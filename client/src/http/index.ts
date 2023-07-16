import axios from "axios"

export const API_URL = "http://localhost:5000"

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
    }
})
$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}` 
    return config
})

export default $api