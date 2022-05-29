import React from 'react'
import s from './Profile.module.css'
import CurrentUserInfo from './currentUserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

let CurrentUser = (props) => {
    return (
        <div>
            <div className='currentUser'>
                <CurrentUserInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
                <MyPostsContainer />
            </div>
        </div>
    )
}


export default CurrentUser;