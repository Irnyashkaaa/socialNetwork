import { usersType } from './../../types/types';
import React from "react";
import { connect } from "react-redux";
import { followAC, setPagesAC, setUsersAC, unfollowAC, setUsersCountAC, toggleIsFetchingAC, followingInProgressAC, getUsersThunkCreator, updateUsersThunk, followUserThunk, unfollowUserThunk } from "../../redux/users-reducer.ts";
import { getCurrentPage, getIsFetching, getIsProgress, getPageSize, getTotalCount, getUsers } from "../../selectors/userSelector";
import Users from "./Users";

type mapStateToPropsType = {
    users: Array<usersType>
    currentPage: number
    pageSize: number
    totalCount: number
    isFetching: boolean
    isProgress: boolean
    followingIsProgress?: boolean
}

type mapDispatchToPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number) => void
    updateUsersThunk: (pageNumber: number, pageSize: number) => void
    followUserThunk: (userId: number) => void
    unfollowUserThunk: (userId: number) => void

}

type propsType = mapStateToPropsType & mapDispatchToPropsType

class UsersAPIComponent extends React.Component<propsType> {
    componentDidMount() {
        if (!this.props.users) {
            this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
        }
    }

    updateUsers = (pageNumber: number) => {
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
            unfollowUser={this.props.unfollowUserThunk} />
    }
}

let mapStateToProps = (state: any): mapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isProgress: getIsProgress(state),
    }
}

let UsersContainer = connect<mapStateToPropsType, mapDispatchToPropsType>(mapStateToProps, {
    // follow: followAC,
    // unfollow: unfollowAC,
    // setUsers: setUsersAC,
    // setCurrentPage: setPagesAC,
    // setTotalUsersCount: setUsersCountAC,
    // toggleIsFetching: toggleIsFetchingAC,
    // followingIsProgress: followingInProgressAC,
    getUsersThunk: getUsersThunkCreator,
    updateUsersThunk: updateUsersThunk,
    followUserThunk: followUserThunk,
    unfollowUserThunk: unfollowUserThunk,
})(UsersAPIComponent)

export default UsersContainer;