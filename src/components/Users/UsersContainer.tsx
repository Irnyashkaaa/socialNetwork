// @ts-ignore
import { usersType } from './../../types/types.ts';
import React, { useEffect } from "react";
import { connect } from "react-redux";
//@ts-ignore
import { getUsersThunkCreator, updateUsersThunk, followUserThunk, unfollowUserThunk } from "../../redux/users-reducer.ts";
import { getCurrentPage, getIsFetching, getIsProgress, getPageSize, getTotalCount, getUsers } from "../../selectors/userSelector";
import Users from "./Users";
import { filterType } from '../../redux/users-reducer';
// @ts-ignore
import { initAPIResponseType } from '../../api/api.ts';

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
    getUsersThunk: (currentPage: number, pageSize: number, term: string, friend: string) => void
    updateUsersThunk: (pageNumber: number, pageSize: number) => void
    followUserThunk: (userId: number) => Promise<initAPIResponseType>
    unfollowUserThunk: (userId: number) => Promise<initAPIResponseType>

}

type propsType = mapStateToPropsType & mapDispatchToPropsType

let UsersAPIComponent = (props: propsType) => {
     return <Users/>
}


export default UsersAPIComponent;