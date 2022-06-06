// @ts-ignore
import { actions } from "../redux/users-reducer.ts"
// @ts-ignore
import { UsersReducer } from "../redux/users-reducer.ts"

let state;


beforeEach(() => {
    state = {
        users: [{
            id: 0,
            name: 'User 0',
            status: 'status 0',
            photos: null,
            followed: false
        },
        {
            id: 1,
            name: 'User 1',
            status: 'status 1',
            photos: null,
            followed: false
        },
        {
            id: 2,
            name: 'User 2',
            status: 'status 2',
            photos: null,
            followed: true
        },
        {
            id: 3,
            name: 'User 3',
            status: 'status 3',
            photos: null,
            followed: true
        },
        ],
        pageSize: 5,
        totalCount: 30,
        currentPage: 1,
        isFetching: false,
        followingIsProgress: []
    }
})

test('follow success', () => {
    const newState = UsersReducer(state, actions.followAC(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('unfollow success', () => {
    const newState = UsersReducer(state, actions.unfollowAC(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})
