
let SET_USERS = "SET_USERS"
let FOLLOW = "FOLLOW"
let UNFOLLOW = "UNFOLLOW"
let SETPAGE = 'SET_PAGE'
let SETUSERSCOUNT = 'SETUSERCOUNT'
let TOGGLEISFETCHING = 'TOGGLEISFETCHING'

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({type: SET_USERS, users})
export const setPagesAC = (currentPage) => ({type: SETPAGE, currentPage})
export const setUsersCountAC = (totalCount) => ({type: SETUSERSCOUNT, totalCount})
export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLEISFETCHING, isFetching})

let initState = { 
    users: [],
    pageSize: 5,
    totalCount: 30,
    currentPage: 1,
    isFetching: false
}

export const UsersReducer = (state = initState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    } else {
                        return u
                    }
                } ),
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    } else {
                        return u
                    }
                })
            }
        }
        case SET_USERS: { 
            return {...state, users: action.users}
        }
        case SETPAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SETUSERSCOUNT: {
            return {...state, totalCount: action.totalCount}
        }
        case TOGGLEISFETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        default:
            return state
    }
}