import React from "react";
import { connect } from "react-redux";
import { followAC, setPagesAC, setUsersAC, unfollowAC, setUsersCountAC, toggleIsFetchingAC } from "../../redux/users-reducer";
import Users from "./Users";
import * as axios from "axios"

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalCount: state.users.totalCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
    }
}

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.toggleIsFetching(true)
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
        }


    }

    updateUsers = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    render() {
        return <Users currentPage={this.props.currentPage}
            updateUsers={this.updateUsers}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            totalCount={this.props.totalCount}
            pageSize={this.props.pageSize}
            loading={this.props.isFetching} />
    }
}

let UsersContainer = connect (mapStateToProps, {
        follow: followAC,
        unfollow: unfollowAC,
        setUsers: setUsersAC,
        setCurrentPage: setPagesAC,
        setTotalUsersCount: setUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC
    })(UsersAPIComponent)

export default UsersContainer;