
import Dialogs from "./Dialogs";
import {addMessageActionCreator, newMessageActionCreator} from './../../redux/dialogs-reducer.ts'
import {connect} from 'react-redux'
import { WithAuthRedirect } from "../../hoc/AuthRedirect";



let mapStateToProps = (state) => {
    return {
        dialog: state.dialogs.userData,
        message: state.dialogs.messages, 
        newMessageText: state.dialogs.newMessageText,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {dispatch(addMessageActionCreator())},
        newMessage: (text) => {dispatch(newMessageActionCreator(text))}
    }
}
let Dialogss = WithAuthRedirect(Dialogs)

let DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (Dialogss)

export default DialogsContainer;