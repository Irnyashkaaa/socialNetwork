import * as axios from 'axios';
import React, { useEffect} from 'react'
import { connect } from 'react-redux';
import { setUserProfile, getCurrentUserThunk, setStatusThunk, updateStatusThunk } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import CurrentUser from './Profile'
import { compose } from 'redux';
import { authAPI } from '../../api/api';


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status
})


let CurrentUserContainer = (props) => {
    let id;
    let params = useParams()
    useEffect(() => {
        if (params.id) {
             id = params.id
             props.getCurrentUserThunk(id)
             props.setStatusThunk(id)
        } else {
            authAPI.isUserAuth()
            .then(response => {
                if (response.data.resultCode === 0) {
                    id = response.data.data.id
                    // props.setUserData(id, email, login)
                    props.getCurrentUserThunk(id)
                    props.setStatusThunk(id)    
                }

            })

        }

        
    })

    return (

        <div>
            <CurrentUser {...props} profile={props.profile} status={props.status} updateStatus={props.updateStatusThunk} />
        </div>
    )
}

// CurrentUserContainer = WithAuthRedirect(CurrentUserContainer)

// export default connect(mapStateToProps, { setUserProfile, getCurrentUserThunk })(CurrentUserContainer);

export default compose ( connect(mapStateToProps, {setUserProfile, getCurrentUserThunk, setStatusThunk, updateStatusThunk}, 
    // WithAuthRedirect
    )
) (CurrentUserContainer)