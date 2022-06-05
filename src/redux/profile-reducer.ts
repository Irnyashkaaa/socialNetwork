import { profileAPI, usersAPI, responseCodes } from '../api/api.ts';
import { photosType, postsDataType, profileType } from '../types/types';

type actionsTypes = any

export const actions = {
    addPostActionCreator: () => ({ type: 'ADD_POST' }),
    newPostActionCreator: (text: string) => ({ type: 'NEW_POST', newText: text }),
    setUserProfile: (profile: profileType) => ({ type: 'SET_USER_PROFILE', profile }),
    setStatus: (status: string) => ({ type:'SET_STATUS', status }),
    savePhotoAC: (file: photosType) => ({ type: 'SAVE_PHOTO', file })
}



type initStateType = {
    postsData: postsDataType[]
    newPostText: string
    profile: profileType
    status: string
}

let initState: initStateType = {
    postsData: [
        { name: "name1", message: "message", likesCount: 6 },
        { name: 'name2', message: "message", likesCount: 12 },
        { name: 'name3', message: "message", likesCount: 14 },
        { name: 'name4', message: "message", likesCount: 15 },
        { name: 'name5', message: "message", likesCount: 16 }
    ],
    newPostText: "New text",
    profile: null,
    status: 'Enter here your status'
}
export const ProfileReducer = (state = initState, action: actionsTypes) => {
    switch (action.type) {
        case 'ADD_POST': {
            return {
                ...state,
                postsData: [{ name: "name6", message: state.newPostText, likesCount: 0 }, ...state.postsData,],
                newPostText: ""
            }
        }
        case 'NEW_POST': {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SAVE_PHOTO': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.file }
            }
        }
        default:
            return state;
    }
}


export const getCurrentUserThunk = (currentId: number) => {
    return async (dispatch: any) => {
        let response = await usersAPI.getCurrentUser(currentId)
        dispatch(actions.setUserProfile(response.data))
    }
}

export const getStatusThunk = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(response.data))
    }
}

export const updateStatusThunk = (status: string) => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === responseCodes.Succes) {
            dispatch(actions.setStatus(status))
        } else {
            alert('some error')
        }
    }
}

export const savePhoto = (file: any) => {
    return async (dispatch: any) => {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === responseCodes.Succes) {
            dispatch(actions.savePhotoAC(response.data.data.photos))
        }
    }
}
