import React from "react";
import s from "./Dialogs.module.css"
import ChatUser from './Dialog/Dialog'
import Message from "./Messages"



let Dialogs = (props) => {

    let dialog = props.dialog.map(el => <ChatUser id={el.id} name={el.name} />)
    let message = props.message.map(el => <Message message={el.message} />)

    let newMessageElement = React.createRef()

    function addMessage () {
        props.addMessage();
        newMessageElement.current.value = "";
    }

    function newMessage () {
        let text = newMessageElement.current.value
        props.newMessage(text)
    }


    return (

        <div className={s.content}>
            <div className={s.item}>
                <div className={s.userName}>
                    {dialog}
                </div>
            </div>
            <div className={s.item}>
                {message}
                <div className={s.addMessage}>
                    <textarea onChange={newMessage} ref={newMessageElement} value={props.newMessageText}>enter your message</textarea>
                    <button onClick={addMessage}>send message</button>
                </div>

            </div>
        </div>
    )
}

export default Dialogs;