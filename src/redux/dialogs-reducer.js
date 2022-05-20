let ADD_MESSAGE = 'ADD-MESSAGE';
let NEW_MESSAGE = 'NEW-MESSAGE';

export const addMessageActionCreator = () => ({ type: "ADD-MESSAGE" })
export const newMessageActionCreator = (text) => ({ type: "NEW-MESSAGE", newMessage: text })
let initState = {
    newMessageText: "write new message",
    userData: [
        { name: "Kate", id: 1 },
        { name: "Nick", id: 2 },
        { name: "Bob", id: 3 },
        { name: "Mike", id: 4 },
        { name: "Eva", id: 5 },
        { name: "Helen", id: 6 }
    ],
    messages: [
        { message: "chat1", id: "1" },
        { message: "chat2", id: "2" },
        { message: "chat3", id: "3" },
        { message: "chat4", id: "4" },
        { message: "chat5", id: "5" },
        { message: "chat6", id: "6" },
    ]
}
export const DialogsReducer = (state = initState, action) => {
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