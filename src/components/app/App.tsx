import React, { useState } from 'react';
import './App.css';
import Navbar from '../navbar/navbar';
import HomeComponent from '../home/home';
import MenuHome from '../menu/home/home';
import EjerciciosHome from '../ejercicios/home/home';
import PedidosHome from '../pedidos/home/home';
import ContactoDetails from '../contacto/details/details';
import Footer from '../footer/footer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import {
	BrowserRouter as Router, Switch, Route, Link
  } from 'react-router-dom';
import NewFoodForm from '../menu/admin/newFoodForm/newFoodForm';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: amber,
  }
});

const App: React.FC = () => {
	const [current_user_type, setCurrentUserType] = useState('CommonUser');
  const [is_user_logged, setIsUserLogged] = useState(false);
  return (
	<ThemeProvider theme={theme}>
	      <Router>
		<Navbar user_type={current_user_type} is_user_logged={is_user_logged}/>
		{/* A <Switch> looks through its children <Route>s and
		    renders the first one that matches the current URL. */}
		<Switch>
		  <Route path="/Inicio">
		    <HomeComponent />
		  </Route>
		  <Route exact path="/">
		    <HomeComponent />
		  </Route>
		  <Route path="/Menu">
		    <NewFoodForm />
		  </Route>
		  <Route path="/Ejercicios">
		    <MenuHome />
		  </Route>
		  <Route path="/Pedidos">
		    <PedidosHome />
		  </Route>
		  <Route path="/Contacto">
		    <ContactoDetails />
		  </Route>
		</Switch>
		<Footer/>
	      </Router>
	    </ThemeProvider>
  );
}

export default App;
