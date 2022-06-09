
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
// @ts-ignore
import { setUserProfile, getCurrentUserThunk, getStatusThunk, updateStatusThunk, savePhoto } from '../../redux/profile-reducer.ts';
import {CurrentUser} from './Profile'
import { useParams } from 'react-router-dom';
// @ts-ignore
import { authAPI } from '../../api/api.ts';
import { WithAuthRedirect } from '../../hoc/AuthRedirect'
// @ts-ignore
import {profileType} from '../../types/types.ts'
import { getIsAuth, getProfile, getStatus } from '../../selectors/profileSelector';

type mapStateToPropsType = {
    profile: profileType
    isAuth: boolean
    status: string
}
type mapDispatchToProps = {
    getCurrentUserThunk: (id: number) => void
    getStatusThunk: (id: number) => void
    savePhoto: () => void
    updateStatusThunk: () => void
}
type propsType = mapStateToPropsType  & mapDispatchToProps

let mapStateToProps = (state: any): mapStateToPropsType => {
    return ({
        profile: getProfile(state),
        isAuth: getIsAuth(state),
        status: getStatus(state),
    })
}


let CurrentUserContainer: React.FC<propsType> = (props) => {
    let id: number;
    let params = useParams()
    useEffect(() => {
        if (params.id) {
            id = Number(params.id)
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

export default connect<mapStateToPropsType, mapDispatchToProps>(mapStateToProps, { getCurrentUserThunk, getStatusThunk, updateStatusThunk, savePhoto })(CurrentUserContainerr)
