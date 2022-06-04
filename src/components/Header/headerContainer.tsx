import React, { useEffect } from "react";
import Header from './header'
import{ setUserData, logout} from '../../redux/auth-reducer.ts'
import {connect} from 'react-redux'
import { authAPI } from "../../api/api.ts";

type mapStateToPropsType = {
    isAuth: boolean
    login: string
}
type mapDispatchToPropsType = {
    setUserData: () => void
    logout: () => void
}

type propsType = mapStateToPropsType & mapDispatchToPropsType

let mapStateToProps = (state: any): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

let HeaderContainer: React.FC<propsType> = (props) => {
    useEffect (() => {
        authAPI.isUserAuth()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                props.setUserData(id, email, login, true)

            }
        })
    })
    return (
        <div>
            <Header {...props}/>
        </div>
    )
}


export default connect<mapStateToPropsType, mapDispatchToPropsType> (mapStateToProps, {setUserData, logout}) (HeaderContainer);