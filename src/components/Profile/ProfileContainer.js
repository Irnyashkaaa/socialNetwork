import * as axios from 'axios';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import CurrentUser from './Profile'

class CurrentUserContainerr extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/')
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <div>
                <div>
                    {console.log(this.props)}
                    <CurrentUser {...this.props} profile={this.props.profile} />
                </div>
            </div>
        )
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

let CurrentUserContainer = (props) => {
    let params = useParams()
    useEffect(() => {
        if (params.id) {
            params.id = params.id
        } else {
            params.id = 2
        }
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + params.id)
            .then(response => {
                props.setUserProfile(response.data)

            })
    })
    return (
        <div>
            <CurrentUser {...props} profile={props.profile} />
        </div>
    )
}

export default connect(mapStateToProps, { setUserProfile })(CurrentUserContainer);