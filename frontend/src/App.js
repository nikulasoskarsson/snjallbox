import React, { useState } from 'react';

import Navbar from './components/layout/Navbar';
import PlusIcon from './components/layout/PlusIcon';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateUser from './components/auth/CreateUser';
import AuthState from './context/auth/authState';
import SignIn from './components/auth/SignIn';
import NewOrder from './components/Orders/NewOrder';
import Orders from './components/Orders/Orders';
import Home from './components/layout/Home';
import Logo from './components/layout/Logo';
import Darkmode from './components/layout/Darkmode';
import NewOrderInfo from './components/Orders/NewOrderInfo';
import UpdateOrder from './components/Orders/UpdateOrder';

function App() {
  const [darkmode, setDarkmode] = useState(false);
  const showDarkMode = () => {
    console.log('running');
    setDarkmode(!darkmode);
  };
  return (
    <AuthState>
      <Router>
        <div className={darkmode ? 'darkmode' : ''}>
          <Navbar />
          <Route exact path='/' component={Home} />
          {/* <Logo /> */}
          <PlusIcon />
          <Darkmode showDarkMode={showDarkMode} />

          <Route exact path='/create-user' component={CreateUser} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route
            exact
            path='/new-order'
            component={NewOrder}
            order='no-order'
          />
          <Route exact path='/orders' component={Orders} />
          <Route exact path='/new-order-info' component={NewOrderInfo} />
          <Route exact path='/update-order/:id' component={UpdateOrder} />
        </div>
      </Router>
    </AuthState>
  );
}

export default App;
