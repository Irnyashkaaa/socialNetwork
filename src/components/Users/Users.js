import React, { useState } from "react";
import s from './User.module.css'
import userDefaultImage from '../../images/user.png'
import preloaderImg from '../../images/preloader.gif'
import { NavLink } from "react-router-dom";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) { pages.push(i) }
    let portionSize = 10

    let portionCount = Math.ceil(pagesCount / portionSize)

    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize

    return (
        <div>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(--portionNumber)}>before</button>}
            {pages.filter(page => page>= leftPortionNumber && page <= rightPortionNumber)
                .map(page => {
                    return <button onClick={() => props.updateUsers(page)}>{page}</button>
                })
            }

            {portionNumber < portionCount && <button onClick={() => setPortionNumber(++portionNumber)}>next</button>}
            {props.users.map(u => <div className={s.userBody}>
                <div className={s.user}>
                    <NavLink to={'/profile/' + u.id}>
                        <img className={s.photo} src={props.loading ? preloaderImg : (u.photos.small != null ? u.photos.small : userDefaultImage)} /></NavLink>
                    {u.followed
                        ? <button disabled={props.progress.some(id => id === u.id)}
                            onClick={() => { props.followUser(u.id) }
                            }>unfollow</button>
                        : <button disabled={props.progress.some(id => id === u.id)}
                            onClick={() => { props.unfollowUser(u.id) }
                            }>follow</button>}
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