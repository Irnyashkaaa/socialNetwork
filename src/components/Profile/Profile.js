import React from 'react'
import s from './Profile.module.css'
import CurrentUserInfo from './currentUserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import {useParams} from 'react-router-dom'

let CurrentUser = (props) => {
    return (
        <div>
            <img className={s.img_main} src='./../../img/image.jpg'></img>
            <div className='currentUser'>
                <CurrentUserInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
                <MyPostsContainer />
            </div>
        </div>
    )
}


export default CurrentUser;