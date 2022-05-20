import React from "react";
import { NavLink } from "react-router-dom";
import s from './NavPage.module.css'

let NavPage = () => {
    return (
        <nav className={s.item}>
            <div className={s.menu_item}>
                <NavLink to="/profile"  >Profile</NavLink>
            </div>
            <div className={s.menu_item}>
                <NavLink to='/dialoges' >Messages</NavLink>
            </div>
            <div>
                <a className={s.menu_item}>News</a>
            </div>
            <div>
                <a className={s.menu_item}>Music</a>
            </div>
            <div className={s.menu_item}>
                <NavLink to='/users'>Find users</NavLink>
            </div>
        </nav>
    )
}

export default NavPage;