import React from "react";
import { connect } from "react-redux";
import { followAC, setPagesAC, setUsersAC, unfollowAC, setUsersCountAC, toggleIsFetchingAC, followingInProgressAC, getUsersThunkCreator, updateUsersThunk, followUserThunk, unfollowUserThunk } from "../../redux/users-reducer";
import Users from "./Users";

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        if (!this.props.users) {
            this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
        }
    }

    updateUsers = (pageNumber) => {
        this.props.updateUsersThunk(pageNumber, this.props.pageSize)
    }

    render() {

        return <Users currentPage={this.props.currentPage}
            updateUsers={this.updateUsers}
            users={this.props.users}
            totalCount={this.props.totalCount}
            pageSize={this.props.pageSize}
            loading={this.props.isFetching}
            progress={this.props.isProgress}
            followingIsProgress={this.props.followingIsProgress} 
            followUser={this.props.followUserThunk}
            unfollowUser={this.props.unfollowUserThunk}/>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalCount: state.users.totalCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        isProgress: state.users.followingIsProgress,
    }
}

let UsersContainer = connect(mapStateToProps, {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setPagesAC,
    setTotalUsersCount: setUsersCountAC,
    toggleIsFetching: toggleIsFetchingAC,
    followingIsProgress: followingInProgressAC,
    getUsersThunk: getUsersThunkCreator,
    updateUsersThunk: updateUsersThunk,
    followUserThunk: followUserThunk,
    unfollowUserThunk: unfollowUserThunk,
})(UsersAPIComponent)

export default UsersContainer;