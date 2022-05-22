import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '3b039490-e8a3-4669-8f48-3a9b5d181b77'
    }

})

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 5) {
        return  instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then (response => {
                return response.data
            })    
    },
    deleteFollow (userId) {
        return instance.delete(`follow/${userId}`)
            .then (response => {
                return response.data
            })
    },
    postFollow (userId) {
        return instance.post(`follow/${userId}`, {})
            .then (response => {
                return response.data
            })
    },
    getCurrentUser (currentId) {
        return instance.get('profile/' + currentId)
    }
}
