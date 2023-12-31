import React, {useState, useEffect} from 'react';
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://posts.com/posts')
        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts().then();
    }, []);

    const renderedPosts = Object.values(posts).map((post, index) => {
        return (
            <div className='card' style={{width: '30%', marginBottom: '20px'}} key={post.id}>
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    });

    return (
        <div className='d-flex flex-flow flex-wrap justify-content-between'>{renderedPosts}</div>
    )
}
