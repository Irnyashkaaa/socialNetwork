

export const getUsers = (state) => {
    return state.users.users
}

export const getPageSize = (state) => {
    return state.users.pageSize
}

export const getTotalCount = (state) => {
    return state.users.totalCount
}

export const getCurrentPage = (state) => {
    return state.users.isFetching
}

export const getIsFetching = (state) => {
    return state.users.isFetching
}

export const getIsProgress = (state) => {
    return state.users.followingIsProgress
}