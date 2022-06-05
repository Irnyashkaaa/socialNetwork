import { responseCodes } from './../api/api.ts';
import { ActionTypes, AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from "../api/api.ts"
import { usersType } from '../types/types';
import { Dispatch } from 'redux';

const actions = {
    followAC: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowAC: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsersAC: (users: usersType) => ({ type: 'SET_USERS', users } as const),
    setPagesAC: (currentPage: number) => ({ type: 'SETPAGE', currentPage } as const),
    setUsersCountAC: (totalCount: number) => ({ type: 'SETUSERSCOUNT', totalCount } as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({ type: 'TOGGLEISFETCHING', isFetching } as const),
    followingInProgressAC: (isProgress: boolean, userId: number) => ({ type: 'FOLLOWINGISPROGRESS', isProgress, userId } as const),
}

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
type actionsTypes = ActionTypes<typeof actions>

export const UsersReducer = (state = initState, action: actionsTypes) => {
    switch (action.type) {
        case "FOLLOW": {
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
        case 'UNFOLLOW': {
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
        case 'SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'SETPAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SETUSERSCOUNT': {
            return { ...state, totalCount: action.totalCount }
        }
        case 'TOGGLEISFETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'FOLLOWINGISPROGRESS': {
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

type thunkType = ThunkAction<void, AppStateType, unknown, actionsTypes>
type dispatchType = Dispatch<actionsTypes>

export const getUsersThunkCreator = (currentPage: number, pageSize: number): thunkType => {
    return async (dispatch: dispatchType) => {
        dispatch(actions.toggleIsFetchingAC(true))
        let response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetchingAC(false))
        dispatch(actions.setUsersAC(response.item))
    }
}


export const updateUsersThunk = (pageNumber: number, pageSize: number): thunkType => {
    return async (dispatch: dispatchType) => {
        let response = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(actions.setPagesAC(pageNumber))
        dispatch(actions.setUsersAC(response.items))
        dispatch(actions.setUsersCountAC(response.totalCount))
    }
}

export const followUserThunk = (userId: number): thunkType => {
    return async (dispatch: dispatchType) => {
        dispatch(actions.followingInProgressAC(true, userId))
        let response = await usersAPI.deleteFollow(userId)
        if (response.resultCode === responseCodes.Succes) {
            dispatch(actions.followAC(userId))
        }
        dispatch(actions.followingInProgressAC(false, userId))
    }
}

export const unfollowUserThunk = (userId: number): thunkType => {
    return async (dispatch: dispatchType) => {
        dispatch(actions.followingInProgressAC(true, userId))
        let response = await usersAPI.postFollow(userId)
        if (response.resultCode === responseCodes.Succes) {
            dispatch(actions.unfollowAC(userId))
        }
        dispatch(actions.followingInProgressAC(false, userId))
    }
}