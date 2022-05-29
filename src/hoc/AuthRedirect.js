import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export const WithAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            debugger
            if (this.props.isAuth === false) return <Navigate to='/login/' />
            return <Component {...this.props} />
        }
    }
    return RedirectComponent
}