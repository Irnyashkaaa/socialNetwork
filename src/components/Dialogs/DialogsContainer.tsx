
import Dialogs from "./Dialogs";
import { actions} from './../../redux/dialogs-reducer.ts'
import { connect } from 'react-redux'
import { WithAuthRedirect } from "../../hoc/AuthRedirect";

type mapStateToPropsType = {
    dialog: any
    message: string
    newMessageText: string
    isAuth: boolean
}
type mapDispatchToPropsType = {
    addMessage: () => void
    newMessage: (text: string) => void
}

let mapStateToProps = (state: any): mapStateToPropsType => {
    return {
        dialog: state.dialogs.userData,
        message: state.dialogs.messages,
        newMessageText: state.dialogs.newMessageText,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => ({
    addMessage: () => { dispatch(actions.addMessageActionCreator()) },
    newMessage: (text) => { dispatch(actions.newMessageActionCreator(text)) }
})

let DialogsContainer = connect<mapStateToPropsType, mapDispatchToPropsType>(mapStateToProps, mapDispatchToProps)(WithAuthRedirect(Dialogs))

export default DialogsContainer;