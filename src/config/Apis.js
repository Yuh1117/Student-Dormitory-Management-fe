import axios from "axios"

BASE_URL = "https://vovanhuy.pythonanywhere.com/"
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
    "surveys":"/surveys/",
    "survey-responses":(surveyId) => `surveys/${surveyId}/survey-responses`

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