import axios from 'axios'
import { profileAPI, usersAPI } from '../api/api';

let ADD_POST = 'ADD-POST';
let NEW_POST = 'NEW-POST';
let SET_USER_PROFILE = 'SET-USER-PRODILE'
let SET_STATUS = 'SET-STATUS'

export const addPostActionCreator = () => ({ type: "ADD-POST" });
export const newPostActionCreator = (text) => ({ type: "NEW-POST", newText: text })
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})


let initState = {
    postsData: [
        { name: "name1", message: "message", likesCount: "6" },
        { name: 'name2', message: "message", likesCount: "12" },
        { name: 'name3', message: "message", likesCount: '14' },
        { name: 'name4', message: "message", likesCount: '15' },
        { name: 'name5', message: "message", likesCount: '16' }
    ],
    newPostText: "New text",
    profile: null,
    status: 'Enter here your status'
}
export const ProfileReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [{name: "name6", message: state.newPostText, likesCount: 0}, ...state.postsData, ],
                newPostText: ""
            }
        }
        case NEW_POST: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state, 
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const getCurrentUserThunk = (currentId) => {
    return (dispatch) => {
        usersAPI.getCurrentUser(currentId)
            .then(response => {
                dispatch(setUserProfile(response.data))

            })
    }
}

export const setStatusThunk = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            })
    }
}

export const updateStatusThunk = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode == 0) {

                }
            })
    }
}