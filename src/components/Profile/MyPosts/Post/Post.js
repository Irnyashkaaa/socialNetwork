import React from 'react'
import s from './Post.module.css'


let MyPost = (props) => {
    return (
        <div className={s.item}>
            <img className={s.userImage} src="https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"/>
            <div className='usertext'>
                <div className={s.userName}>{props.name}</div>
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