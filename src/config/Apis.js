import axios from "axios"

BASE_URL = "http://10.0.2.2:8000/"
export const endpoints = {
    "login": "/users/login/",
    "listRooms": "/rooms/",
    "buildings": "/buildings/",
    "rooms": "/rooms/",
    "users": "/users/",
    "current-user": "/users/current-user/",
    "invoices": "/invoices/",
    "available-student": "/users/available-students/",
    "room-assignments": "/room-assignments/",
    "remove-member": (id) => `/rooms/${id}/remove-member/`,
    "notifications": "/notifications/",
    "surveys": "/surveys/",
    "survey-questions": (id) => `/surveys/${id}/survey-questions/`,
    "survey-responses": (id) => `/surveys/${id}/survey-responses/`,
    "surveys-history": "/surveys/survey-history",
    "complaints": "/complaints/",
    "my-complaints": "/complaints/my-complaints",
    "my-room-complaints": "/complaints/my-room-complaints"

}

export const authApis = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL,
});