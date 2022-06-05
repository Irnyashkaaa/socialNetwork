import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css'
import {useNavigate} from 'react-router-dom'

let Header = (props) => {
    let navigate = useNavigate()
    let onClick = () => {
        props.logout()
        navigate('/login')
    }
    return (
        <header className={s.item}>
            <img className="img" src="/../../img/logo.jpg" />
            <div className={s.currentUser}>
                {(props.isAuth === false)
                    ?<NavLink className={s.linkToSingup} to='/login' >Login</NavLink>
                    :<div className={s.linkToSingup}>{props.login}
                    <button onClick={onClick}>log out </button>
                </div>}
            </div>
        </header>
    )
}

export default Header;