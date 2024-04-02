import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from '../src/pages/Login.page';
import { Home } from '../src/pages/Home.page';
import { Register } from '../src/pages/Register.page';
import { ProductList } from './pages/ListProduct.page';
import NotFound from './pages/NotFound.page';
import Navbar from './components/navbar';
import EditOrder from './pages/EditOrder.page';

const handleLogout = () => {
  localStorage.removeItem('token'); // Hapus token dari local storage
  setToken(null);
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
      // Lakukan proses logout di sini, termasuk menghapus token dari local storage
      localStorage.removeItem('token');
      setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/home" component={Home} />
        <Route path="/product" component={ProductList} />
        <Route path="/product/:productId/edit" component={EditProduct} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/orders/:orderId/edit" component={EditOrder} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
