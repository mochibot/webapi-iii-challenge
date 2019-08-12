import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';

const UserForm = (props) => {
  const [user, setUser] = useState({
    name: ''
  });

  useEffect(() => {
    if (props.activeUser) {
      setUser({
        name: props.activeUser.name,
      })
    }
  }, [props.activeUser]);

  const [error, setError] = useState('')

  const inputUser = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
    setError('');
  }

  const submitUser = (event) => {
    event.preventDefault();
    if (!user.name) {
      setError('Name cannot be left blank');
    } else {
      if (props.activeUser) {
        props.editUser(props.activeUser.id, user)
      } else {
        props.addUser(user);
      }
    }
    setUser({
      name: '',
    })
  }

  return (
    <Form onSubmit={submitUser} className='user-form'>
      <input name='name' placeholder='Name' value={user.name} onChange={inputUser}/>
      {error && <div>{error}</div>}
      <div className='post-form-btn'>
        <Button onClick={submitUser}>Submit</Button>
        <Button onClick={props.closeModal}>Cancel</Button>
      </div>
    </Form>
  )
}

export default UserForm;

