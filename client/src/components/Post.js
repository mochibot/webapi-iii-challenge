import React from 'react';
import { Card } from 'antd'

const Post = (props) => {
  return (
    <Card type='inner'>
      <div>{props.post.text}</div>
    </Card>
  )
}

export default Post;