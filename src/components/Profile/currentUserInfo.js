import React from "react"
import s from './currentUserInfo.module.css'
import preloaderImg from '../../images/preloader.gif'
import userDefaultImage from '../../images/user.png'
import { ProfileStatus } from "./Status"
import { getProfile } from '../../selectors/profileSelector'
import { useSelector } from 'react-redux'


let CurrentUser = (props) => {


    const profile = useSelector(getProfile)


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
            <img src={imgSrc} />
            <ProfileStatus isOwner={props.isOwner}/>
        </div>)
}

export default CurrentUser;
