import { usersAPI } from "../api/api"

let SET_USERS = "SET_USERS"
let FOLLOW = "FOLLOW"
let UNFOLLOW = "UNFOLLOW"
let SETPAGE = 'SET_PAGE'
let SETUSERSCOUNT = 'SETUSERCOUNT'
let TOGGLEISFETCHING = 'TOGGLEISFETCHING'
let FOLLOWINGISPROGRESS = 'FOLLOWINGISPROGRESS'

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const setPagesAC = (currentPage) => ({ type: SETPAGE, currentPage })
export const setUsersCountAC = (totalCount) => ({ type: SETUSERSCOUNT, totalCount })
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLEISFETCHING, isFetching })
export const followingInProgressAC = (isProgress, userId) => ({ type: FOLLOWINGISPROGRESS, isProgress, userId })

let initState = {
    users: [],
    pageSize: 5,
    totalCount: 30,
    currentPage: 1,
    isFetching: false,
    followingIsProgress: []
}

export const UsersReducer = (state = initState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    } else {
                        return u
                    }
                }),
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    } else {
                        return u
                    }
                })
            }
        }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SETPAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SETUSERSCOUNT: {
            return { ...state, totalCount: action.totalCount }
        }
        case TOGGLEISFETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case FOLLOWINGISPROGRESS: {
            return {
                ...state,
                followingIsProgress:
                    action.isProgress
                        ? [...state.followingIsProgress, action.userId]
                        : [state.followingIsProgress.filter(id => id != action.userId)]
            }
        }
        default:
            return state
    }
}

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then(response => {
                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAC(response.item))
            })
    }
}

export const updateUsersThunk = (pageNumber, pageSize) => {
    return (dispatch) => {
        dispatch(setPagesAC(pageNumber))
        dispatch(toggleIsFetchingAC(true))
        usersAPI.getUsers(pageNumber, pageSize)
            .then(response => {
                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAC(response.items))
                dispatch(setUsersCountAC(response.totalCount))
            })
    }
}

export const followUserThunk = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgressAC(true, userId))
        usersAPI.deleteFollow(userId)
            .then(response => {
                if (response.resultCode == 0) {
                    dispatch(followAC(userId))
                }
                dispatch(followingInProgressAC(false, userId))
            })
    }
}

export const unfollowUserThunk = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgressAC(true, userId))
        usersAPI.postFollow(userId)
            .then(response => {
                if (response.resultCode == 0) {
                    dispatch(unfollowAC(userId))
                }
                dispatch(followingInProgressAC(false, userId))
            })

    }
}