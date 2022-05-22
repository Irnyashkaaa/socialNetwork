import * as axios from 'axios';
import React, { useEffect} from 'react'
import { connect } from 'react-redux';
import { setUserProfile, getCurrentUserThunk } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import CurrentUser from './Profile'
import {Navigate} from 'react-router-dom'
import { WithAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let CurrentUserContainer = (props) => {
    let params = useParams()
    useEffect(() => {
        if (params.id) {
            params.id = params.id
        } else {
            params.id = 2
        }
        props.getCurrentUserThunk(params.id)
        
    })

    return (

        <div>
            <CurrentUser {...props} profile={props.profile} />
        </div>
    )
}

CurrentUserContainer = WithAuthRedirect(CurrentUserContainer)

export default connect(mapStateToProps, { setUserProfile, getCurrentUserThunk })(CurrentUserContainer);

// export default compose ( connect(mapStateToProps, {setUserProfile, getCurrentUserThunk}, WithAuthRedirect,)
// ) (CurrentUserContainer)