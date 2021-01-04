import React from 'react';
import { Route, BrowserRouter as Router} from 'react-router-dom'
import './App.css';

import PrivateRoute from './PrivateRoute'
import UserProvider from './Auth';
import Home from './components/home/home'
import Shelf from './components/shelf/shelf'

function App() {
  //const user = null;
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/shelf" component={Shelf} /> 
        </Router>
      </div>
    </UserProvider>

  );
}

export default App;
