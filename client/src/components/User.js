import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';

const User = (props) => {
  return (
    <List.Item
      extra={[
        <Button icon='' onClick={(event) => props.deleteUser(event, props.user.id)}>Delete</Button>,
        <Button icon=''onClick={(event) => props.selectUser(event, props.user)}>Edit</Button>
      ]}>
    <List.Item.Meta 
      title={props.user.name} 
      description={<Link to={`/users/${props.user.id}`}><Button icon='solution'>View posts</Button></Link>} />
    </List.Item>
  )
}

export default User;