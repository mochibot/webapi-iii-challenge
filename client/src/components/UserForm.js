import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';

const UserForm = (props) => {
  const [user, setUSer] = useState({
    name: ''
  });

  useEffect(() => {
    if (props.activeUser) {
      setPost({
        name: props.activeUser.name,
      })
    }
  }, [props.activeUser]);

  const [error, setError] = useState('')

  const inputUser = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value
    })
    setError('');
  }

  const submitUser = (event) => {
    event.preventDefault();
    if (!post.name) {
      setError('Name cannot be left blank');
    } else {
      if (props.activeUser) {
        props.editPost(props.activePost.id, user)
      } else {
        props.addPost(user);
      }
    }
    setPost({
      name: '',
    })
  }

  return (
    <Form onSubmit={submitUser} className='user-form'>
      <input name='name' placeholder='Name' value={user.name} onChange={inputUser}/>
      {error && <div>{error}</div>}
      <div className='post-form-btn'>
        <Button onClick={submitUse}>Submit</Button>
        <Button onClick={props.closeModal}>Cancel</Button>
      </div>
    </Form>
  )
}

export default UserForm;

