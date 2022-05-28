import React, { useEffect } from "react";
import Header from './header'
import axios from "axios";
import{ setUserData, logout} from '../../redux/auth-reducer'
import {connect} from 'react-redux'
import { authAPI } from "../../api/api";

let HeaderContainer = (props) => {
    useEffect (() => {
        authAPI.isUserAuth()
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

let mapStatetoProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect (mapStatetoProps, {setUserData, logout}) (HeaderContainer);