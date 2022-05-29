
import Dialogs from "./Dialogs";
import {addMessageActionCreator, newMessageActionCreator} from './../../redux/dialogs-reducer'
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

let DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (Dialogs)

export default WithAuthRedirect(DialogsContainer);