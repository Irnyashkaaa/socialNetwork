import { ProfileReducer } from "./profile-reducer";
import { DialogsReducer } from "./dialogs-reducer";
export let store = {
    _state: {
        profilePage: {
            postsData: [
                { name: "name1", message: "message", likesCount: "6" },
                { name: 'name2', message: "message", likesCount: "12" },
                { name: 'name3', message: "message", likesCount: '14' },
                { name: 'name4', message: "message", likesCount: '15' },
                { name: 'name5', message: "message", likesCount: '16' }
            ],
            newPostText: "New text",
        },

        dialogs: {
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
        },
        sidebar: {}

    },
    getState() {
        return this._state
    },
    _rerenderDomTree() {
        console.log("state changed")
    },
    subscribe(observer) {
        this._rerenderDomTree = observer
    },

    dispatch(action) {
        this._state.profilePage = (ProfileReducer(this._state.profilePage, action))
        this._state.dispatch = (DialogsReducer(this._state.dialogs, action))
        this._rerenderDomTree(this._state)
    },

}



window.store = store;