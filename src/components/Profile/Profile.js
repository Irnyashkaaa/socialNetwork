import React from 'react'
import CurrentUserInfo from './currentUserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer.tsx'

export let CurrentUser = (props) => {

    const onMainPhotoSelected = (e) => {
        props.savePhoto(e.target.files[0])
    }

    return (
        <div>
            {props.isOwner && <input onChange={onMainPhotoSelected} type='file' />}
            <div className='currentUser'>
                <CurrentUserInfo profile={props.profile} isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
                <MyPostsContainer />
            </div>
        </div>
    )
}
