import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css'

let Header = (props) => {

    return (
        <header className={s.item}>
            <img className="img" src="/../../img/logo.jpg"/>
            <div className={s.currentUser}>
                {(props.isAuth)
                    ?<div className={s.linkToSingup}>{props.login}</div>
                    :<NavLink className={s.linkToSingup} to='/login' >Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;