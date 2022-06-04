import { responseCodes } from './../api/api.ts';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from "../api/api.ts"
import { usersType } from '../types/types';
import { Dispatch } from 'redux';

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

type actionsTypes = followACType | unfollowACType | setUsersACType | setPagesACType | setUsersCountACType | toogleACType

export const UsersReducer = (state = initState, action: actionsTypes) => {
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

type thunkType = ThunkAction <void, AppStateType, unknown, actionsTypes>
type dispatchType = Dispatch <actionsTypes>

export const getUsersThunkCreator = (currentPage: number, pageSize: number): thunkType => {
    return async (dispatch: dispatchType) => {
        dispatch(toggleIsFetchingAC(true))
        let response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(response.item))
    }
}


export const updateUsersThunk = (pageNumber: number, pageSize: number): thunkType => {
    return async (dispatch: dispatchType) => {
        let response = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(setPagesAC(pageNumber))
        dispatch(setUsersAC(response.items))
        dispatch(setUsersCountAC(response.totalCount))
    }
}

export const followUserThunk = (userId: number): thunkType => {
    return async (dispatch: dispatchType) => {
        dispatch(followingInProgressAC(true, userId))
        let response = await usersAPI.deleteFollow(userId)
        if (response.resultCode === responseCodes.Succes) {
            dispatch(followAC(userId))
        }
        dispatch(followingInProgressAC(false, userId))
    }
}

export const unfollowUserThunk = (userId: number): thunkType => {
    return async (dispatch: dispatchType) => {
        dispatch(followingInProgressAC(true, userId))
        let response = await usersAPI.postFollow(userId)
        if (response.resultCode === responseCodes.Succes) {
            dispatch(unfollowAC(userId))
        }
        dispatch(followingInProgressAC(false, userId))
    }
}