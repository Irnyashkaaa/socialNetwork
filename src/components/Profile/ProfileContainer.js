import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { setUserProfile, getCurrentUserThunk, getStatusThunk, updateStatusThunk, savePhoto } from '../../redux/profile-reducer.ts';
import { useParams } from 'react-router-dom';
import CurrentUser from './Profile'
import { authAPI } from '../../api/api';
import { WithAuthRedirect } from '../../hoc/AuthRedirect'
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return ({
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        nickName: state.auth.login
    })
}


let CurrentUserContainer = (props) => {
    let id;
    let params = useParams()
    useEffect(() => {
        if (params.id) {
            id = params.id
            props.getCurrentUserThunk(id)
            props.getStatusThunk(id)
        } else {
            authAPI.isUserAuth()
                .then(response => {
                    if (response.data.resultCode === 0) {

                        id = response.data.data.id
                        props.getCurrentUserThunk(id)
                        props.getStatusThunk(id)
                    }
                })

        }
    }, [])

    return (

        <div>
            <CurrentUser savePhoto={props.savePhoto} {...props} 
                        isOwner={!params.id} 
                        profile={props.profile} 
                        status={props.status}
                         updateStatus={props.updateStatusThunk} />
        </div>
    )
}
let CurrentUserContainerr = WithAuthRedirect(CurrentUserContainer)

export default connect(mapStateToProps, { setUserProfile, getCurrentUserThunk, getStatusThunk, updateStatusThunk, savePhoto })(CurrentUserContainerr)
