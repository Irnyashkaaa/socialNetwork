import { ActionTypes } from "./redux-store";

let ADD_MESSAGE = 'ADD-MESSAGE';
let NEW_MESSAGE = 'NEW-MESSAGE';


export const actions = {
    addMessageActionCreator: () => ({ type: ADD_MESSAGE }),
    newMessageActionCreator: (text: string) => ({ type: NEW_MESSAGE, text }),
}



type userDataType = {
    name: string
    id: number
}

type messagesType = {
    message: string
    id: number
}

let initState = {
    newMessageText: "write new message",
    userData: [
        { name: "Kate", id: 1 },
        { name: "Nick", id: 2 },
        { name: "Bob", id: 3 },
        { name: "Mike", id: 4 },
        { name: "Eva", id: 5 },
        { name: "Helen", id: 6 }
    ] as Array <userDataType>,
    messages: [
        { message: "chat1", id: 1 },
        { message: "chat2", id: 2 },
        { message: "chat3", id: 3 },
        { message: "chat4", id: 4 },
        { message: "chat5", id: 5 },
        { message: "chat6", id: 6 },
    ] as Array <messagesType>
}

type InitStateType = typeof initState
type actionTypes = ActionTypes<typeof actions>

export const DialogsReducer = (state = initState, action: actionTypes): InitStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {id: 20, message: state.newMessageText}],
                newMessageText: " ",
            }
        }
        case NEW_MESSAGE: {
            return {
                ...state,
                newMessageText: action.text
            }
        }
        default:
            return state
    }
}