import { photosType } from './../types/types';
import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'a6bb54fd-7959-4b36-a81b-1f7f125aecad'
    }

})
export type initAPIResponseType = {
    resultCode: number
    messages: []
    data: {
        id?: number
        email?: string
        login?: string
    }
}
type getUsersInfoType = {
    name: string
    id: number
    photos: photosType
    status: string
    followed: boolean
}
type getUsersType = {
    items: [getUsersInfoType]
    totalCount: number
    error: string | null
}
type getCurrentUserType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: photosType
}

type savePhotoType = {
    data: {
        small: string
        large: string
    }
    resultCode: number
    messages: []
}

export enum responseCodes {
    Succes = 0,
    CaptchaError = 10,
    Error = 1
}

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 5, term: string | null = '', friend: string | null) {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`)
        .then (response => {
                return response.data
            })
    },
    deleteFollow (userId: number) {
        return instance.delete(`follow/${userId}`)
            .then (response => {
                return response.data
            }) as Promise<initAPIResponseType>
    },
    postFollow (userId: number) {
        return instance.post<initAPIResponseType>(`follow/${userId}`, {})
            .then (response => {
                return response.data
            })
    },
    getCurrentUser (currentId: number) {
        return profileAPI.getCurrentUser(currentId)
    },
}

export const profileAPI = {
    getCurrentUser(currentId: number) {
        return instance.get<getCurrentUserType>('profile/' + currentId)
    },
    getStatus (userId: number) {
        return instance.get<string>('profile/status/' + userId)
    },
    updateStatus (status: number) {
        return instance.put<initAPIResponseType>('profile/status', {status: status})
    }, 
    savePhoto(photo: any) {
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put<savePhotoType>('profile/photo', formData)
    },
}

export const authAPI = {
    isUserAuth () {
        return instance.get <initAPIResponseType>('auth/me')
    },
    login(email: any, password: string, rememberMe: boolean, captcha: string | null | undefined = null) {
        return instance.post<initAPIResponseType>('auth/login', {email, password, rememberMe, captcha})
    },
    logOut() {
        return instance.delete<initAPIResponseType>('auth/login')
    }
}

export const securityAPI = {
    getCaptchaURL () {
        return instance.get<{url: string}>('/security/get-captcha-url')
    }
}