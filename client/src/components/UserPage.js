import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Spin } from 'antd'
import Post from './Post';

const UserPage = (props) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  let baseURL = '/api/users';
  let id = props.match.params.userId;

  useEffect(() => {
    axios.get(baseURL + `/${id}`)
      .then(response => {
        console.log('fetch user success: ', response);
        setUser(response.data)
        setIsLoadingUser(false);
      })
      .catch(error => {
        console.log('fetch user error: ', error);
      })
  }, [baseURL, id])

  useEffect(() => {
    axios.get(baseURL + `/${id}/posts`)
      .then(response => {
        console.log('fetch posts success: ', response);
        setPosts(response.data);
        setIsLoadingPosts(false);
      })
      .catch(error => {
        console.log('fetch posts error: ', error);
      })
  }, [baseURL, id]);

  return (
    <div>
      <Link to='/users'>Back to users list</Link>
      {isLoadingUser || isLoadingPosts ? 
        (<div>
          <Spin size='large' tip='Loading'/>
        </div>) :
        (<Card title={`All posts by ${user.name}`} style={{width: '500px', margin: '20px auto'}}>
          {posts.map(item => <Post key={`post ${item.id}`} post={item}/>)}
        </Card>)}
    </div>
  )
}

export default UserPage;