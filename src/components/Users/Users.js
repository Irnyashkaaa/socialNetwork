import React, { useState, useEffect } from "react";
import {useSelector, useDispatch,} from 'react-redux'
import s from './User.module.css'
import userDefaultImage from '../../images/user.png'
import preloaderImg from '../../images/preloader.gif'
import { NavLink } from "react-router-dom";
// @ts-ignore
import { getCurrentPage, getFilter, getIsFetching, getIsProgress, getPageSize, getTotalCount, getUsers } from "../../selectors/userSelector";
//@ts-ignore
import {UsersFilterForm} from './UsersFilterForm.tsx'
import { getUsersThunkCreator, followUserThunk, unfollowUserThunk, updateUsersThunk } from "../../redux/users-reducer.ts";
import { useNavigate} from "react-router-dom";


const Users = () => {
    const users = useSelector(getUsers)
    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const loading = useSelector(getIsFetching)
    const progress = useSelector(getIsProgress)
    const filter = useSelector(getFilter)

    const dispatch = useDispatch()

    const updateUsers = (pageNumber) => {
        dispatch(updateUsersThunk(pageNumber, pageSize))
    }

    const onFilterChanged = (filter) => {
        dispatch(getUsersThunkCreator(1, 100, filter.term, filter.friend))
    }
    const followUser = (userId) => {
        dispatch(followUserThunk(userId))
    }
    const unfollowUser = (userId) => {
        dispatch(unfollowUserThunk(userId))
    }

    const navigate = useNavigate()

    useEffect(() => {

        dispatch(getUsersThunkCreator(currentPage, pageSize, filter.term, filter.friend))
    }, [])

    useEffect(() => {

        navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${Number(currentPage)}`)
    }, [filter, currentPage])

    const pagesCount = Math.ceil(totalCount / pageSize)

    const pages = []

    for (let i = 1; i <= pagesCount; i++) { pages.push(i) }
    const portionSize = 10

    const portionCount = Math.ceil(pagesCount / portionSize)

    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionNumber = portionNumber * portionSize


    return (
        <div>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(--portionNumber)}>before</button>}
            {pages.filter(page => page >= leftPortionNumber && page <= rightPortionNumber)
                .map(page => {
                    return <button onClick={() => updateUsers(page)}>{page}</button>
                })
            }

            {portionNumber < portionCount && <button onClick={() => setPortionNumber(++portionNumber)}>next</button>}

            <UsersFilterForm onFilterChanged={onFilterChanged}/>

            {users.map(u => <div className={s.userBody}>
                <div className={s.user}>
                    <NavLink to={'/profile/' + u.id}>
                        <img className={s.photo} src={loading ? preloaderImg : (u.photos.small != null ? u.photos.small : userDefaultImage)} /></NavLink>
                    {u.followed
                        ? <button disabled={progress.some(id => id === u.id)}
                            onClick={() => {followUser(u.id) }
                            }>unfollow</button>
                        : <button disabled={progress.some(id => id === u.id)}
                            onClick={() => {unfollowUser(u.id) }
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