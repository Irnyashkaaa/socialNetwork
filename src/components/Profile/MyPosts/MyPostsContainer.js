
import { addPostActionCreator, newPostActionCreator } from './../../../redux/profile-reducer'
import MyPosts from './Myposts'
import {connect} from 'react-redux'



let mapStateToProps = (state) => {
    return {
        store: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.postsData
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {dispatch(addPostActionCreator())},
        newPost: (text) => {dispatch(newPostActionCreator(text))}
    }
}

let MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts) 

export default MyPostsContainer;