import { authAPI } from "../api/api"

let SET_USER_DATA = "SET_USERS_DATA"

export const setUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, data: {id, email, login, isAuth} })

let initState = { 
    isFetching: false,
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReduser = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }

        default:
            return state
    }
}

export const getUserData = () => (dispatch) => {
    authAPI.isUserAuth()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data
                dispatch(setUserData(id, login, email, true))
            }
        })
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getUserData())
            }
        })
}

export const logout = () => (dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
}

