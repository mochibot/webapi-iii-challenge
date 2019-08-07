import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';

const User = (props) => {
  return (
    <List.Item extra={<Link to={`/users/${props.user.id}`}><Button icon='solution'>View posts</Button></Link>}>
      <h3 style={{width: '100%'}}>{props.user.name}</h3>
    </List.Item>
  )
}

export default User;