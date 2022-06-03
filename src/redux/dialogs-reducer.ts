let ADD_MESSAGE = 'ADD-MESSAGE';
let NEW_MESSAGE = 'NEW-MESSAGE';

type addMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE })

type newMessageActionCreatorType = {
    type: typeof NEW_MESSAGE
    newMessage: string
}

export const newMessageActionCreator = (text: string): newMessageActionCreatorType=> ({ type: NEW_MESSAGE, newMessage: text })

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
        { message: "chat1", id: "1" },
        { message: "chat2", id: "2" },
        { message: "chat3", id: "3" },
        { message: "chat4", id: "4" },
        { message: "chat5", id: "5" },
        { message: "chat6", id: "6" },
    ] as Array <messagesType>
}

type InitStateType = typeof InitState
export const DialogsReducer = (state = initState, action: any): InitStateType => {
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
                newMessageText: action.newMessage
            }
        }
        default:
            return state
    }
}