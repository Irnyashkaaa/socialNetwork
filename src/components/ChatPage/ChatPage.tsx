import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import React, { useEffect, useState } from 'react'
import defaulImage from '../../images/user.png'


const ChatPage: React.FC = () => {
    return (
        <div>
            <Messages />
            <AddMessagesForm />
        </div>
    )
}

type propsType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Message: React.FC<propsType> = ({ message, photo, userName }) => {
    return (
        <div style={{ maxWidth: 700, borderWidth: 1, borderStyle: 'solid', borderColor: '#b9c7e4', margin: 10 }}>
            <img src={photo} style={{ width: 50, borderRadius: '50%' }} />
            {`${userName}: ${message}`}
        </div>
    )
}


export const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Messages: React.FC = () => {


    const [messages, setMessages] = useState([])

    useEffect(() => {
        wsChanel.addEventListener('message', (e) => {
            let newMessage = JSON.parse(e.data)
            // @ts-ignore
            setMessages(() => [...newMessage])
        })
    }, [])

    return (
        <div style={{maxWidth: 700, height: 600, overflow: 'auto' }}>
            {messages.map(m => {
                return (
                    // @ts-ignore
                    <Message message={m.message} photo={m.photo || defaulImage} userId={m.userId} userName={m.userName} />
                )
            })}
        </div>
    )
}


type onSubmitType = {
    message: string
}


const AddMessagesForm: React.FC = () => {
    return (
        <div style={{ width: 300 }}>
            <Formik
                initialValues={{
                    message: ''
                }}
                // @ts-ignore
                onSubmit={(values: onSubmitType, { setSubmitting }) => {
                    setSubmitting(true)
                    if (values.message.length > 0 && values.message != ' ') {
                        wsChanel.send(values.message)
                    }
                    setSubmitting(false)
                }}
            >
                {() => (
                    <Form style={{ display: 'flex', }}>
                        <Input onChange={() => console.log()} name='message'></Input>
                        <SubmitButton >send</SubmitButton>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default ChatPage