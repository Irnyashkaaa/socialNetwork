import React from 'react'
import s from './Myposts.module.css'
import MyPost from './Post/Post'



let MyPosts = (props) => {

    let posts = props.posts.map(el => <MyPost name={el.name} likesCount={el.likesCount} message={el.message}/>)
    let newPostElement = React.createRef();
    function addPost () {
        props.addPost()
        newPostElement.current.value = " ";
    }
    function newPost () {
        let text = newPostElement.current.value;
        props.newPost(text)
    }

    return (
        <div>
            <div>
                My posts
                <textarea onChange={newPost} ref={newPostElement} value={props.newPostText} />
                <button onClick={addPost}>add post</button>
            </div>
            <div className={s.posts}>
                {posts} 
            </div>
        </div>
    )
}


export default MyPosts;