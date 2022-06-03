import { authAPI, securityAPI } from "../api/api"
import { setUserDataDataType } from "../types/types"

let SET_USER_DATA = "SET_USERS_DATA"
let GET_CAPTCHA_URL = "GET_CAPTCHA_URL"



type setUserDataType = {
    type: typeof SET_USER_DATA
    data: setUserDataDataType
}

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean = false): setUserDataType => ({
    type: SET_USER_DATA,
    data: { id, email, login, isAuth } 
})
type GetCaptchaURLDataType = {
    captchaUrl: string | null
}
type getCaptchaURLType = {
    type: typeof GET_CAPTCHA_URL
    data: GetCaptchaURLDataType
}
export const getCaptchaURLAC = (captchaUrl: string | null): getCaptchaURLType => ({ 
    type: GET_CAPTCHA_URL, 
    data: {captchaUrl}
}) 

type InitStateType = {
    isFetching: boolean,
    id: number | null,
    email: string | null,
    isAuth: boolean,
    login: string | null,
    captchaUrl: string | null
}

let initState:InitStateType = {
    isFetching: false,
    id: null,
    email: null,
    isAuth: false,
    login: null,
    captchaUrl: null
}

export const authReduser = (state: InitStateType = initState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state, 
                ...action.data
            }
        }
        case GET_CAPTCHA_URL:{
            return {
                ...state,
                ...action.data,
            }
        }

        default:
            return state
    }
}


export const getUserData = () => async (dispatch: any) => {
    let response = await authAPI.isUserAuth()

    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch(setUserData(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getUserData())
    } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaURL())
    }

}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}

export const getCaptchaURL = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaURL()
    let captchaUrl = response.data.url 
    dispatch(getCaptchaURLAC(captchaUrl))
}