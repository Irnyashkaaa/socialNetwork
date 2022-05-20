import React, { useEffect } from "react";
import s from './Header.module.css'
import Header from './header'
import axios from "axios";
import{ setUserData} from '../../redux/auth-reducer'
import {connect} from 'react-redux'

let HeaderContainer = (props) => {
    useEffect (() => {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {withCredentials: true})
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                props.setUserData(id, email, login)
            }
        })
    })
    return (
        <div>
            <Header {...props}/>
        </div>
    )
}
let mapStatetoProps = (state) => ({})
export default connect (mapStatetoProps, {setUserData}) (HeaderContainer);