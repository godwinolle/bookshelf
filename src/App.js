import React from 'react';
import { Route, BrowserRouter as Router} from 'react-router-dom'
import './App.css';

import PrivateRoute from './PrivateRoute'
import UserProvider from './Auth';

import Landing from './Pages/Landing/Landing'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import Home from './components/home/home'
import Shelf from './components/shelf/shelf'

function App() {
  //const user = null;
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/sign" component={Home} />
          <PrivateRoute exact path="/shelf" component={Shelf} /> 
        </Router>
      </div>
    </UserProvider>

  );
}

export default App;
