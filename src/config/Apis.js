import axios from "axios"

BASE_URL = "https://vovanhuy.pythonanywhere.com/"
export const endpoints = {
    "login" : "/users/login/",
    "listRooms" : "/rooms/",
    "buildings":"/buildings/",
    "rooms":"rooms",
    "users":"/users/"
}

export default axios.create({
    baseURL: BASE_URL,
});