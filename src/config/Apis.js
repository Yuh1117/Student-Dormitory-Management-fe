import axios from "axios"

BASE_URL = "http://10.0.2.2:8000/"
// BASE_URL = "https://vovanhuy.pythonanywhere.com/"
// BASE_URL = "https://yuh1117.pythona

export const endpoints = {
    "login": "/users/login/",
    "users": "/users/",
    "deactivate-student":(id)=>`/users/${id}/deactivate_student/`,
    "current-user": "/users/current-user/",
    "listRooms": "/rooms/",
    "buildings": "/buildings/",
    "rooms": "/rooms/",
    "invoices": "/invoices/",
    "my-room-invoices": "/invoices/my-room-invoices",
    "invoice-payment": (id) => `/invoices/${id}/vnpay_payment_url/`,
    "available-student": "/users/available-students/",
    // "room-assignments": "/room-assignments/",
    "get-room-assignments":(id)=>`/rooms/${id}/room-assignments/`,
    "remove-member": (id) => `/rooms/${id}/remove-member/`,
    'my-room': `/rooms/my-room/`,
    "notifications": "/notifications/",
    "surveys": "/surveys/",
    "survey-questions": (id) => `/surveys/${id}/survey-questions/`,
    "survey-responses": (id) => `/surveys/${id}/survey-responses/`,
    "surveys-history": "/surveys/survey-history",
    "complaints": "/complaints/",
    "my-room-complaints": "/complaints/my-room-complaints",
    "complaints-resolve":(id) =>`/complaints/${id}/resolve/`,
    "complaints-responses":(id) => `/complaints/${id}/complaints-responses/`,
    "room-change-requests":"/room-change-requests/",
    "room-change-requests-history": "room-change-requests/my-room-change-requests",
    "/statistics-sumamary/":"/statistics/summary/",
    "/statistics-detail/":"/statistics/detail/",
    "survey-student-count":(id) => `surveys/${id}/survey-student-count/`
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