import React from 'react';
import { Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserPage from './components/UserPage';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Some app
      </header>
      <Route exact path='/users' component={UserList} />
      <Route path='/users/:userId' component={UserPage} />
    </div>
  );
}

export default App;
