import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { getIsAuth, getLogin } from "../../selectors/headerSelector";
import { setUserData, logout } from '../../redux/auth-reducer.ts';
import { useDispatch } from "react-redux";
import { authAPI } from '../../api/api.ts'
import { Button, Col, Row } from "antd";



export let HeaderComponent = () => {

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)

    const dispatch = useDispatch()

    const logoutFunction = () => {
        return dispatch(logout())
    }
    const setUserDataFunction = (id, email, login, isAuth) => {
        return dispatch(setUserData(id, email, login, isAuth))
    }

    useEffect(() => {
        authAPI.isUserAuth()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let { id, email, login } = response.data.data
                    setUserDataFunction(id, email, login, true)

                }
            })
    })


    let navigate = useNavigate()
    let onClick = () => {
        logoutFunction()
        navigate('/login')
    }
    return (
        <header>
            <div >
                {(isAuth === false)
                    ? <NavLink to='/login' >Login</NavLink>

                    : <Row justify="start">
                        <Col> <Button onClick={onClick}>logout</Button></Col>
                        <Col span={5}>
                            <div style={{color: "white", marginLeft: 10, fontWeight: 600, fontSize: 30}}> {login} </div>
                        </Col>
                    </Row>
                }
            </div>
        </header>
    )
}
