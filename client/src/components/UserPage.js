import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'antd'
import Post from './Post';

const UserPage = (props) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  let baseURL = 'http://localhost:8000/users';
  let id = props.match.params.userId;

  useEffect(() => {
    axios.get(baseURL + `/${id}`)
      .then(response => {
        console.log('fetch user success: ', response);
        setUser(response.data)
      })
      .catch(error => {
        console.log('fetch user error: ', error);
      })
  }, [baseURL])

  useEffect(() => {
    axios.get(baseURL + `/${id}/posts`)
      .then(response => {
        console.log('fetch posts success: ', response);
        setPosts(response.data);
      })
      .catch(error => {
        console.log('fetch posts error: ', error);
      })
  }, [baseURL]);

  return (
    <div>
      <Link to='/users'>Back to users list</Link>
      <Card title={`All posts by ${user.name}`} style={{width: '500px', margin: '20px auto'}}>
        {posts.map(item => <Post key={'post ' + item.id} post={item}/>)}
      </Card>
    </div>
  )
}

export default UserPage;