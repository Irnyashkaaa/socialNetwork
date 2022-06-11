import React from "react"
import s from './currentUserInfo.module.css'
import preloaderImg from '../../images/preloader.gif'
import userDefaultImage from '../../images/user.png'
import { ProfileStatus } from "./Status"
import { getProfile } from '../../selectors/profileSelector'
import { useDispatch, useSelector } from 'react-redux'
import { savePhoto } from '../../redux/profile-reducer.ts'
import { useParams } from 'react-router-dom'


let CurrentUser = () => {
    const profile = useSelector(getProfile)

    let params = useParams()
    const isOwner = !params.id

    const dispatch = useDispatch()

    const savePhotoFunction = (file) => {
        return dispatch(savePhoto(file))
    }
    const onMainPhotoSelected = (e) => {
        savePhotoFunction(e.target.files[0])
    }


    let imgSrc;
    if (!profile) {
        imgSrc = preloaderImg
    } else if (!profile.photos.large) {
        imgSrc = userDefaultImage
    } else {
        imgSrc = profile.photos.large
    }

    return (
        <div className={s.CurrentUserInfo}>
            <div>
            {isOwner && <input onChange={onMainPhotoSelected} type='file' />}
            </div>

            <img src={imgSrc} />

            <ProfileStatus isOwner={isOwner} />
        </div>)
}

export default CurrentUser;
