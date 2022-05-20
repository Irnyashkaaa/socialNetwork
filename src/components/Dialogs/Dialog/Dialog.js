import React from "react";
import { NavLink } from "react-router-dom";

let ChatUser = (props) => {
    return (
        <div>
            <NavLink to={'/dialoges/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default ChatUser;