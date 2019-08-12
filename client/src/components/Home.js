import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd'

const Home = () => {
  return (
    <Button><Link to='/users'>See users</Link></Button>
  )
}

export default Home;