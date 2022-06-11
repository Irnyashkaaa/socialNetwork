import React from 'react'
import s from './Post.module.css'
import {useSelector} from 'react-redux'
import { getProfile } from '../../../../selectors/profileSelector'
import preloaderImg from '../../../../images/preloader.gif'
import userDefaultImage from '../../../../images/user.png'


let MyPost = (props) => {

    const profile = useSelector(getProfile)

    let imgSrc;
    let userName
    if (!profile) {
        imgSrc = preloaderImg
        userName = 'some name'
    } else if (!profile.photos.large) {
        imgSrc = userDefaultImage
    } else {
        imgSrc = profile.photos.large
        userName = profile.fullName
    }


    return (
        <div className={s.item}>
            <img className={s.userImage} src={imgSrc}/>
            <div className='usertext'>
                <div className={s.userName}>{userName}</div>
                <div className={s.userPost}>{props.message}</div>
                <div>
                    <span>like {props.likesCount}</span>
                    <div></div>
                </div>
            </div>

        </div>
    )
}


export default MyPost;