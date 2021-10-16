import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Dashboard from './component/dashboard/dashboard.component';
import Favourite from './component/favourite/favourite.component';
import Header from './component/header/header';
import Home from './component/home/home.component';
import Login from './component/login/login.component';
import Register from './component/register/register.component';
import PrivateRoute from './PrivateRoute';

class App extends React.Component{
  render(){
    return(
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/favourites' component={Favourite} />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App;
