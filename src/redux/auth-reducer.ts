import { useNavigate } from 'react-router-dom';
import { AppStateType } from './redux-store';
import { authAPI, securityAPI, profileAPI } from "../api/api.ts"
import { setUserDataDataType } from "../types/types"
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux';
import { responseCodes } from '../api/api.ts';

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
    captchaUrl: string | null | undefined
}
type getCaptchaURLType = {
    type: typeof GET_CAPTCHA_URL
    data: GetCaptchaURLDataType
}
export const getCaptchaURLAC = (captchaUrl: string | null | undefined): getCaptchaURLType => ({
    type: GET_CAPTCHA_URL,
    data: { captchaUrl }
})

type InitStateType = {
    isFetching: boolean,
    id: number | null,
    email: string | null,
    isAuth: boolean,
    login: string | null,
    captchaUrl: string | null | undefined
}

let initState: InitStateType = {
    isFetching: false,
    id: null,
    email: null,
    isAuth: false,
    login: null,
    captchaUrl: null
}

type actionsTypes = getCaptchaURLType | setUserDataType

export const authReduser = (state: InitStateType = initState, action: actionsTypes) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
        case GET_CAPTCHA_URL: {
            return {
                ...state,
                ...action.data,
            }
        }
        default:
            return state
    }
}
type thunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, actionsTypes>
type dispatchType = Dispatch<actionsTypes>

export const getUserData = (): thunkActionType => async (dispatch: dispatchType) => {
    let response = await authAPI.isUserAuth()
    let navigate = useNavigate()
    if (response.data.resultCode === responseCodes.Succes) {
        let { id, login, email } = response.data.data
        dispatch(setUserData(id, login, email, true))
        navigate('/profile')
    }
}

export const login = async (email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === responseCodes.Succes) {
        let response = await authAPI.isUserAuth()
        if (response.data.resultCode === 0) {
            profileAPI.getCurrentUser(response.data.data.id)
        }
    } else {
        alert(response.data.messages)
    }
}

export const logout = (): thunkActionType => async (dispatch: dispatchType) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === responseCodes.Succes) {
        dispatch(setUserData(null, null, null, false))
    }
}

export const getCaptchaURL = (): thunkActionType => async (dispatch: dispatchType) => {
    let response = await securityAPI.getCaptchaURL()
    let captchaUrl = response.data.url
    dispatch(getCaptchaURLAC(captchaUrl))
}