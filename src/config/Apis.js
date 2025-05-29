import axios from "axios"

BASE_URL = "http://10.0.2.2:8000/"
export const endpoints = {
    "login": "/users/login/",
    "users": "/users/",
    "current-user": "/users/current-user/",
    "listRooms": "/rooms/",
    "buildings": "/buildings/",
    "rooms": "/rooms/",
    "invoices": "/invoices/",
    "my-room-invoices": "/invoices/my-room-invoices",
    "invoice-payment": (id) => `/invoices/${id}/vnpay_payment_url/`,
    "available-student": "/users/available-students/",
    "room-assignments": "/room-assignments/",
    "room-assignments-student": (id) => `/rooms/${id}/room-assignments/`,
    "remove-member": (id) => `/rooms/${id}/remove-member/`,
    'my-room': `/rooms/my-room/`,
    "notifications": "/notifications/",
    "surveys": "/surveys/",
    "survey-questions": (id) => `/surveys/${id}/survey-questions/`,
    "survey-responses": (id) => `/surveys/${id}/survey-responses/`,
    "surveys-history": "/surveys/survey-history",
    "complaints": "/complaints/",
    "my-complaints": "/complaints/my-complaints",
    "my-room-complaints": "/complaints/my-room-complaints",
    "complaint-detail-responses": (id) => `/complaints/${id}/complaints-responses`,

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