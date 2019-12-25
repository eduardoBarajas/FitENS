import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from './logo/logo';
import LinksBar from './links-bar/links-bar';
import SideMenu from './side-menu/side-menu';
import LoginButton from './login-button/login-button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import KitchenIcon from '@material-ui/icons/Kitchen';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AssistantIcon from '@material-ui/icons/Assistant';
import {isMobile} from 'react-device-detect';
import HomeIcon from '@material-ui/icons/Home';
require('./navbar.css');

type INavbarProps = {
    show?: string,
    user_type: string,
    is_user_logged: boolean
};

const Navbar: React.FC<INavbarProps> = (props) => {
    const [drawer_opened, setDrawerOpened] = useState(false);
    let tabs_to_render = [];
    // se cargan los links de los tabs dependiendo el tipo de usuario.
    switch (props.user_type) {
        case 'CommonUser': tabs_to_render = [{'Inicio':['Inicio', <HomeIcon/>]}, {'Menu':['Menu', <KitchenIcon />]},
            {'Ejercicios':['Ejercicios', <DirectionsWalkIcon />]}, {'Pedidos':['Pedidos', <ListAltIcon />]},
            {'Contacto':['Contacto', <ContactMailIcon />]}]; break;
        case 'AdminUser': tabs_to_render = [{'Menu':['AdministrarMenu', <KitchenIcon />]},
            {'Ejercicios':['AdministrarEjercicios', <DirectionsWalkIcon />]}, {'Pedidos':['AdministrarPedidos', <ListAltIcon />]},
            {'Recomendaciones':['AdministrarRecomendaciones', <AssistantIcon />]}]; break;
        default: tabs_to_render = [{'Contacto':['Contacto', <ContactMailIcon />]}];
    }
    let button_for_login = <LoginButton is_user_logged={props.is_user_logged}></LoginButton>;
    let menu;
    // si es movil entonces se utiliza otro tipo de menu
    if (isMobile) {
        menu =  <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpened(!drawer_opened)}>
                            <MenuIcon />
                        </IconButton>
                        <Logo></Logo>
                    </Toolbar>
                    <SideMenu drawer_opened={drawer_opened} options={tabs_to_render} login_btn={button_for_login} toggle_drawer={() => setDrawerOpened(!drawer_opened)}></SideMenu>
                </AppBar>;
    } else {
        // si no es movil entonces se utilizan los tabs tradicionales.
        menu = <AppBar position="static">
                    <Toolbar>
                        <Logo></Logo>
                        <LinksBar tabs={tabs_to_render}></LinksBar>
                        {button_for_login}
                    </Toolbar>
                </AppBar>;
    }
    return (menu)
}
export default Navbar;