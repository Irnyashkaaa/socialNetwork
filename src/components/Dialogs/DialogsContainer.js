
import Dialogs from "./Dialogs";
import {addMessageActionCreator, newMessageActionCreator} from './../../redux/dialogs-reducer'
import {connect} from 'react-redux'



let f1 = (state) => {
    return {
        dialog: state.dialogs.userData,
        message: state.dialogs.messages, 
        newMessageText: state.dialogs.newMessageText
    }
}
let f2 = (dispatch) => {
    return {
        addMessage: () => {dispatch(addMessageActionCreator())},
        newMessage: (text) => {dispatch(newMessageActionCreator(text))}
    }
}

let DialogsContainer = connect (f1, f2) (Dialogs)

export default DialogsContainer;