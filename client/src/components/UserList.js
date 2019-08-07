import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { List } from 'antd';
import User from './User';

const UserList = () => {
  const [users, setUsers] = useState([]);
  
  let baseURL = 'http://localhost:8000/users';

  useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        console.log('fetch users success: ', response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log('fetch users error: ', error);
      })
  }, [baseURL]);
  
  return (
    <List style={{width: '500px', margin: '20px auto'}} bordered> 
      {users.map(item => <User key={'user ' + item.id} user={item}/>)}
    </List>
  )
}

export default UserList;