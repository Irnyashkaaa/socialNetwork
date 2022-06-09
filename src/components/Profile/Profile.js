import React from 'react'
import CurrentUserInfo from './currentUserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer.tsx'
import { useDispatch, useSelector } from 'react-redux'
import {savePhoto} from '../../redux/profile-reducer.ts'
import {useParams} from 'react-router-dom'
import { getProfile, getStatus } from '../../selectors/profileSelector'
import { updateStatusThunk } from '../../redux/profile-reducer.ts'

export let CurrentUser = () => {
    let params = useParams()
    const isOwner = !params.id

    const dispatch = useDispatch()

    const savePhotoFunction = (file) => {
        return dispatch(savePhoto(file))
    }
    const onMainPhotoSelected = (e) => {
        savePhotoFunction(e.target.files[0])
    }

    return (
        <div>
            {isOwner && <input onChange={onMainPhotoSelected} type='file' />}
            <div className='currentUser'>
                <CurrentUserInfo isOwner={isOwner}/>
                <MyPostsContainer />
            </div>
        </div>
    )
}
