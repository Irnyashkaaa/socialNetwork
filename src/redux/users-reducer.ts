import { usersAPI } from "../api/api"
import { usersType } from '../types/types';

let SET_USERS = "SET_USERS"
let FOLLOW = "FOLLOW"
let UNFOLLOW = "UNFOLLOW"
let SETPAGE = 'SET_PAGE'
let SETUSERSCOUNT = 'SETUSERCOUNT'
let TOGGLEISFETCHING = 'TOGGLEISFETCHING'
let FOLLOWINGISPROGRESS = 'FOLLOWINGISPROGRESS'

type followACType = {
    type: typeof FOLLOW
    userId: number
}
export const followAC = (userId: number): followACType => ({ type: FOLLOW, userId })
type unfollowACType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowAC = (userId: number): unfollowACType => ({ type: UNFOLLOW, userId })
type setUsersACType = {
    type: typeof SET_USERS
    users: usersType
}
export const setUsersAC = (users: usersType): setUsersACType => ({ type: SET_USERS, users })
type setPagesACType = {
    type: typeof SETPAGE
    currentPage: number
}
export const setPagesAC = (currentPage: number): setPagesACType => ({ type: SETPAGE, currentPage })
type setUsersCountACType = {
    type: typeof SETUSERSCOUNT
    totalCount: number
}
export const setUsersCountAC = (totalCount: number): setUsersCountACType => ({ type: SETUSERSCOUNT, totalCount })
type toogleACType = {
    type: typeof TOGGLEISFETCHING
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): toogleACType => ({ type: TOGGLEISFETCHING, isFetching })
type followingACType = {
    type: typeof FOLLOWINGISPROGRESS
    isProgress: boolean
    userId: number
}
export const followingInProgressAC = (isProgress: boolean, userId: number): followingACType => ({ type: FOLLOWINGISPROGRESS, isProgress, userId })



type initStateType = {
    users: usersType[]
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingIsProgress: number[]
}

let initState: initStateType = {
    users: [],
    pageSize: 5,
    totalCount: 30,
    currentPage: 1,
    isFetching: false,
    followingIsProgress: []
}

export const UsersReducer = (state = initState, action: any) => {
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

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetchingAC(true))
        let response = await usersAPI.getUsers(currentPage, pageSize)
        await dispatch(toggleIsFetchingAC(false))
        await dispatch(setUsersAC(response.item))
    }
}


export const updateUsersThunk = (pageNumber: number, pageSize: number) => {
    return async (dispatch: any) => {
        let response = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(setPagesAC(pageNumber))
        dispatch(toggleIsFetchingAC(true))

                dispatch(toggleIsFetchingAC(false))
                dispatch(setUsersAC(response.items))
                dispatch(setUsersCountAC(response.totalCount))
    }
}

export const followUserThunk = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(followingInProgressAC(true, userId))
        let response = await usersAPI.deleteFollow(userId)
        if (response.resultCode === 0) {
            dispatch(followAC(userId))
        }
        dispatch(followingInProgressAC(false, userId))
    }
}

export const unfollowUserThunk = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(followingInProgressAC(true, userId))
        let response = await usersAPI.postFollow(userId)
                if (response.resultCode === 0) {
                    dispatch(unfollowAC(userId))
                }
                dispatch(followingInProgressAC(false, userId))
    }
}