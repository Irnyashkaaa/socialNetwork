// @ts-ignore
import { followUserThunk } from "../redux/users-reducer.ts";
// @ts-ignore
import { usersAPI, initAPIResponseType, responseCodes  } from "../api/api.ts";

jest.mock('../api/api.ts')
const UserAPIMock = usersAPI

const response: initAPIResponseType = {
    resultCode: responseCodes.Succes,
    messages: [],
    data: {}
}

UserAPIMock.postFollow.mockReturnValue(Promise.resolve(response))

test('', async () => {
    const thunk = followUserThunk(1)
    const dispatchMock = jest.fn()
    await (thunk(dispatchMock))

    expect(dispatchMock).toBeCalledTimes(3)
})