import axios from "axios"

BASE_URL = "https://vovanhuy.pythonanywhere.com/"
export const endpoints = {
    "login" : "/users/login/",
    "listRooms" : "/rooms/",
    "buildings":"/buildings/",
    "rooms":"/rooms/",
    "users":"/users/",
    "invoices":"/invoices/",
    "available-student":"/users/available-students/",
    "room-assignments":"/room-assignments/",
    "remove-member": (id)=>`/rooms/${id}/remove-member/`,
    "notifications":"/notifications/"

}

export default axios.create({
    baseURL: BASE_URL,
});