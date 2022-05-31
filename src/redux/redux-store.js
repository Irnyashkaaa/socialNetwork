import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux"; 
import { ProfileReducer } from './profile-reducer'
import { DialogsReducer } from './dialogs-reducer'
import { UsersReducer } from "./users-reducer";
import { authReduser } from "./auth-reducer";
import thunkMiddleWare from 'redux-thunk'

let reducers = combineReducers({
    profilePage: ProfileReducer,
    dialogs: DialogsReducer,
    users: UsersReducer,
    auth: authReduser,
})

export let store = createStore(reducers, applyMiddleware(thunkMiddleWare))

window.store = store