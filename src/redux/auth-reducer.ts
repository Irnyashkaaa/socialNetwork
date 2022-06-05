import { useNavigate } from 'react-router-dom';
import { ActionTypes, AppStateType } from './redux-store';
import { authAPI, securityAPI, profileAPI, responseCodes } from "../api/api.ts"
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux';


export const actions = {
    getCaptchaURLAC: (captchaUrl: string | null | undefined) => ({
        type: 'GET_CAPTCHA_URL',
        data: { captchaUrl }
    }),
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean = false) => ({
        type: 'SET_USER_DATA',
        data: { id, email, login, isAuth }
    })

}

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean = false) => ({
    type: 'SET_USER_DATA',
    data: { id, email, login, isAuth }
})

type actionsType = ActionTypes<typeof actions>

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

export const authReduser = (state: InitStateType = initState, action: actionsType) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.data
            }
        }
        case 'GET_CAPTCHA_URL': {
            return {
                ...state,
                ...action.data,
            }
        }
        default:
            return state
    }
}
type thunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, actionsType>
type dispatchType = Dispatch<actionsType>

export const getUserData = (): thunkActionType => async (dispatch: dispatchType) => {
    let response = await authAPI.isUserAuth()
    let navigate = useNavigate()
    if (response.data.resultCode === responseCodes.Succes) {
        let { id, login, email } = response.data.data
        dispatch(actions.setUserData(id, login, email, true))
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
        dispatch(actions.setUserData(null, null, null, false))
    }
}

export const getCaptchaURL = (): thunkActionType => async (dispatch: dispatchType) => {
    let response = await securityAPI.getCaptchaURL()
    let captchaUrl = response.data.url
    dispatch(actions.getCaptchaURLAC(captchaUrl))
}
