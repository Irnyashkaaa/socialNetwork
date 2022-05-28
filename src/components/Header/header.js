import React from "react";
import { NavLink } from "react-router-dom";
import { authAPI } from "../../api/api";
import { logout, setUserData } from "../../redux/auth-reducer";
import s from './Header.module.css'

let Header = (props) => {
    let onClick = () => {
        console.log('click')
        props.logout()
    }

    return (
        <header className={s.item}>
            <img className="img" src="/../../img/logo.jpg"/>
            <div className={s.currentUser}>
                {(props.isAuth)
                    ?<div className={s.linkToSingup}>{props.login}
                    <button onClick={onClick}>log out </button>
                    </div>
                    :<NavLink className={s.linkToSingup} to='/login' >Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;