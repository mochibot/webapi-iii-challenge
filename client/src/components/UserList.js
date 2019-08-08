import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { List, Button, Modal } from 'antd';
import UserForm from './UserForm';
import User from './User';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
  
  const addUser = (user) => {
    axios.post(baseURL, user)
      .then(response => {
        console.log('add user success: ', response);
        return axios.get(baseURL)
          .then(response => {
            console.log('fetch users success: ', response);
            setUsers(response.data);
            setIsModalOpen(false);
          })
          .catch(error => {
            console.log('fetch users error: ', error);
          })
      })
      .catch(error => {
        console.log('add user error: ', error);
      })
  }

  const editUser = (id, user) => {
    axios.put(baseURL + `/${id}`, user)
      .then(response => {
        console.log('edit user success: ', response);
        return axios.get(baseURL)
          .then(response => {
            console.log('fetch users success: ', response);
            setUsers(response.data);
            setActiveUser(null);
            setIsModalOpen(false);
          })
          .catch(error => {
            console.log('fetch users error: ', error);
          })
      })
      .catch(error => {
        console.log('edit user error: ', error);
      })
  }

  const deleteUser = (event, id) => {
    event.preventDefault();
    axios.delete(baseURL + `/${id}`)
      .then(response => {
        console.log('delete user success: ', response);
        return axios.get(baseURL)
        .then(response => {
          console.log('fetch users success: ', response);
          setUsers(response.data);
          setIsModalOpen(false);
        })
        .catch(error => {
          console.log('fetch users error: ', error);
        })
      })
      .catch(error => {
        console.log('delete user error: ', error);
      })
  }

  const selectUser = (event, user) => {
    event.preventDefault();
    setActiveUser(user);
    openModal(event);
  }

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  }

  const closeModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
    setActiveUser(null);
  }

  return (
    <List style={{width: '500px', margin: '20px auto'}} bordered> 
      <Button onClick={openModal}>Add user</Button>
      <Modal visible={isModalOpen} footer={null} onCancel={closeModal}>
        <UserForm addUser={addUser} editUser={editUser} closeModal={closeModal} activeUser={activeUser}/>
      </Modal>
      {users.map(item => <User key={'user ' + item.id} user={item} deleteUser={deleteUser} selectUser={selectUser}/>)}
    </List>
  )
}

export default UserList;