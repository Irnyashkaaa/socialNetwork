import { authAPI, securityAPI } from "../api/api"

let SET_USER_DATA = "SET_USERS_DATA"
let GET_CAPTCHA_URL = "GET_CAPTCHA_URL"

export const setUserData = (id, email, login, isAuth = false) => ({ type: SET_USER_DATA, data: { id, email, login, isAuth } })
export const getCaptchaURLAC = (captchaUrl) => ({ type: GET_CAPTCHA_URL, data: {captchaUrl}}) 

let initState = {
    isFetching: false,
    id: null,
    email: null,
    isAuth: false,
    login: null,
    captchaUrl: null
}

export const authReduser = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state, 
                ...action.data
            }
        }
        case GET_CAPTCHA_URL:{
            debugger
            return {
                ...state,
                ...action.data,
            }
        }

        default:
            return state
    }
}

export const getUserData = () => async (dispatch) => {
    let response = await authAPI.isUserAuth()

    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch(setUserData(id, login, email, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getUserData())
    } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaURL())
    }

}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}

export const getCaptchaURL = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaURL()
    let captchaUrl = response.data.url 
    dispatch(getCaptchaURLAC(captchaUrl))
}