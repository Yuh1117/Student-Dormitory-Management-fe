import axios from "axios"

BASE_URL = "http://10.0.2.2:8000/"
export const endpoints = {
    "login": "/users/login/",
    "listRooms": "/rooms/",
    "buildings": "/buildings/"
}

export default axios.create({
    baseURL: BASE_URL,
});