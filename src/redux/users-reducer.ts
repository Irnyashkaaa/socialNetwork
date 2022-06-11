
// @ts-ignore
import { usersAPI, APIResponseType  } from './../api/api.ts';
import { ActionTypes, AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { usersType } from '../types/types';
import { Dispatch } from 'redux';

export const actions = {
    followAC: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowAC: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsersAC: (users: usersType) => ({ type: 'SET_USERS', users } as const),
    setPagesAC: (currentPage: number) => ({ type: 'SETPAGE', currentPage } as const),
    setUsersCountAC: (totalCount: number) => ({ type: 'SETUSERSCOUNT', totalCount } as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({ type: 'TOGGLEISFETCHING', isFetching } as const),
    followingInProgressAC: (isProgress: boolean, userId: number) => ({ type: 'FOLLOWINGISPROGRESS', isProgress, userId } as const),
    setFilterAC: (term: string, friend: string | null) => ({ type: 'SET_USERS_FILTER', term, friend } as const)
}

type initStateType = {
    users: usersType[]
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingIsProgress: number[],
    filter: filterType
}

export type filterType = {
    term: string
    friend: string | null
}
let initState: initStateType = {
    users: [],
    pageSize: 5,
    totalCount: 30,
    currentPage: 1,
    isFetching: false,
    followingIsProgress: [],
    filter: {
        term: '',
        friend: null
    }
}
type actionsTypes = ActionTypes<typeof actions>

export const UsersReducer = (state = initState, action: actionsTypes) => {
    switch (action.type) {
        case "FOLLOW": {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
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
                        return { ...u, followed: false }
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
        case 'SET_USERS_FILTER': {
            return {
                ...state,
                filter: {
                    term: action.term,
                    friend: action.friend
                }
            }
        }
        default:
            return state
    }
}

type thunkType = ThunkAction<void, AppStateType, unknown, actionsTypes>
type dispatchType = Dispatch<actionsTypes>

export const getUsersThunkCreator = (currentPage: number, pageSize: number, term: string, friend: string): thunkType => {
    return async (dispatch: dispatchType) => {
        dispatch(actions.toggleIsFetchingAC(true))
        let response = await usersAPI.getUsers(currentPage, pageSize, term, friend)
        dispatch(actions.setFilterAC(term, friend))
        dispatch(actions.toggleIsFetchingAC(false))
        dispatch(actions.setUsersAC(response.items))
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

const _followUnfollowFlow = async (dispatch: Dispatch<actionsTypes>,
                                            userId: number,
                                            apiMethod: (userId: number) => Promise<APIResponseType>,
                                            actionCreator: (userId: number) => actionsTypes) => {

    dispatch(actions.followingInProgressAC(true, userId))

    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(actions.followingInProgressAC(false, userId))
}

export const followUserThunk = (userId: number): thunkType => {
    return async (dispatch: dispatchType) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.deleteFollow.bind(usersAPI), actions.unfollowAC)
    }
}

export const unfollowUserThunk = (userId: number): thunkType => {
    return async (dispatch: dispatchType) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.postFollow.bind(usersAPI), actions.followAC)
    }
}