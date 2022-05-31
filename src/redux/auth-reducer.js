import { authAPI } from "../api/api"

let SET_USER_DATA = "SET_USERS_DATA"

export const setUserData = (id, email, login, isAuth = false) => ({ type: SET_USER_DATA, data: { id, email, login, isAuth } })

let initState = {
    isFetching: false,
    id: null,
    email: null,
    isAuth: false,
    login: null,

}

export const authReduser = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
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

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getUserData())
    }

}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}

