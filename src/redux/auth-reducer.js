
let SET_USER_DATA = "SET_USERS_DATA"

export const setUserData = (id, email, login) => ({type: SET_USER_DATA, data: id, email, login })

let initState = { 
    isFetching: false,
    id: null,
    email: null,
    login: null,
}

export const authReduser = (state = initState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }

        default:
            return state
    }
}