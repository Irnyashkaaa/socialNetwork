import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'a6bb54fd-7959-4b36-a81b-1f7f125aecad'
    }

})

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
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
        return profileAPI.getCurrentUser(currentId)
    }
}


export const profileAPI = {
    getCurrentUser(currentId) {
        return instance.get('profile/' + currentId)
    },
    getStatus (userId) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus (status) {
        return instance.put('profile/status', {status: status})
    }, 
    savePhoto(photo) {
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo', formData)
    },
}

export const authAPI = {
    isUserAuth () {
        return instance.get('auth/me')
    },
    login(email, password, rememberMe, captcha = null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logOut() {
        return instance.delete('auth/login')
    }
}

export const securityAPI = {
    getCaptchaURL () {
        return instance.get('/security/get-captcha-url')
    }
}