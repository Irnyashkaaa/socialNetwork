import React from "react"
import s from './currentUserInfo.module.css'
import preloaderImg from '../../images/preloader.gif'
import {useParams} from 'react-router-dom'
import userDefaultImage from '../../images/user.png'

let CurrentUser = (props) => {
    let imgSrc;
    if (!props.profile) {
        imgSrc = preloaderImg
    } else if (!props.profile.photos.large) {
        imgSrc = userDefaultImage
    } else {
        imgSrc = props.profile.photos.large
    }

    return (

        <div className={s.CurrentUserInfo}>
            <img src={imgSrc} />
            <div className='currentUserDescription'></div>

        </div>)
}

export default CurrentUser;
