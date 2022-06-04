
import { addPostActionCreator, newPostActionCreator } from './../../../redux/profile-reducer.ts'
import MyPosts from './Myposts'
import {connect} from 'react-redux'

type userPostType = {
    name: string
    likesCount: number
    message: string
}

type mapStateToPropsType = {
    store: any
    newPostText: string
    posts: userPostType[]
}
type mapDispatchToPropsType = {
    addPost: () => void
    newPost: (text: string) => void
}
let mapStateToProps = (state: any): mapStateToPropsType => {
    return {
        store: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.postsData
    }
}
let mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
    return {
        addPost: () => {dispatch(addPostActionCreator())},
        newPost: (text: string) => {dispatch(newPostActionCreator(text))}
    }
}

let MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType> (mapStateToProps, mapDispatchToProps) (MyPosts) 

export default MyPostsContainer;