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
    "get-room-assignments":(id)=>`/rooms/${id}/room-assignments/`,
    "remove-member": (id) => `/rooms/${id}/remove-member/`,
    "notifications": "/notifications/",
    "surveys":"/surveys/",
    "survey-responses":(surveyId) => `/surveys/${surveyId}/survey-responses`,
    "survey-questions":(surveyId) =>`/surveys/${surveyId}/survey-questions/`,
    "complaints":"/complaints/",
    "complaints-resolve":(id) =>`/complaints/${id}/resolve/`,
    "complaints-responses":(id) => `/complaints/${id}/complaints-responses/`,
    "room-change-requests":"/room-change-requests/"

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