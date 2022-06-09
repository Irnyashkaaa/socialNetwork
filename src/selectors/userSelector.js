export const getUsers = (state) => {
    return state.usersPage.users
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.isFetching
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getIsProgress = (state) => {
    return state.usersPage.followingIsProgress
}