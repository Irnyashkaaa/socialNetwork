
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
// @ts-ignore
import { getCurrentUserThunk, getStatusThunk, updateStatusThunk, savePhoto } from '../../redux/profile-reducer.ts';
import { CurrentUser } from './Profile'
import { useParams } from 'react-router-dom';
// @ts-ignore
import { authAPI } from '../../api/api.ts';
import { WithAuthRedirect } from '../../hoc/AuthRedirect'
// @ts-ignore
import { profileType } from '../../types/types.ts'
import { getIsAuth, getProfile, getStatus } from '../../selectors/profileSelector';

type mapStateToPropsType = {
    profile: profileType
    isAuth: boolean
    status: string
}
type mapDispatchToPropsType = {
    getCurrentUserThunk: (id: number) => void
    getStatusThunk: (id: number) => void
    savePhoto: () => void
    updateStatusThunk: () => void
}
type propsType = mapStateToPropsType & mapDispatchToPropsType

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
    }, [params.id])

    return (

        <div>
            <CurrentUser savePhoto={props.savePhoto} {...props}
                isOwner={!Number(params.id)}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatusThunk}
                isAuth={props.isAuth} />
        </div>
    )
}

let DialogsContainer = connect<mapStateToPropsType, mapDispatchToPropsType>(mapStateToProps,
     { getCurrentUserThunk, getStatusThunk, updateStatusThunk, savePhoto })(WithAuthRedirect(CurrentUserContainer))

export default DialogsContainer