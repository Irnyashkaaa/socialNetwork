import React from "react";
import s from './User.module.css'
import userDefaultImage from '../../images/user.png'
import preloaderImg from '../../images/preloader.gif'
import { NavLink } from "react-router-dom";

let Users = (props) => {


    let pagesCount = Math.ceil(props.totalCount / props.pageSize)

    let pages = []

    for (let i=1; i <= pagesCount; i++) { pages.push(i) }
    
        return (
            <div>

                {pages.map(page => {
                    return <button className={props.currentPage === page && s.actionPage}
                    onClick={() => props.updateUsers(page)} >{page}</button>
                })}
                {props.users.map(u => <div className={s.userBody}>
                    <div className={s.user}>
                        <NavLink to={'/profile/' + u.id}><img className={s.photo} src={props.loading?preloaderImg:(u.photos.small != null ? u.photos.small : userDefaultImage)} /></NavLink>
                        {u.followed
                            ? <button onClick={() => props.follow(u.id)}>follow</button>
                            : <button onClick={() => props.unfollow(u.id)}>unfollow</button>}
                    </div>
                    <div className={s.userInfo}>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                    <div className={s.location}>
                        <div>city</div>
                        <div>country</div>
                    </div>
                </div>)}
            </div>
        )
    
}


export default Users