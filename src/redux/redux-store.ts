import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux"; 
import { ProfileReducer } from './profile-reducer.ts'
import { DialogsReducer } from './dialogs-reducer.ts'
import { UsersReducer } from "./users-reducer.ts";
import { authReduser } from "./auth-reducer.ts";
import thunkMiddleWare from 'redux-thunk'

let reducers = combineReducers({
    profilePage: ProfileReducer,
    dialogs: DialogsReducer,
    users: UsersReducer,
    auth: authReduser,
})

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type ActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>

type reducersType = typeof reducers
export type AppStateType = ReturnType<reducersType>

export let store = createStore(reducers, applyMiddleware(thunkMiddleWare))
