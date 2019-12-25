import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Link, Redirect, withRouter, RouteComponentProps} from 'react-router-dom';
import LogoSideMenu from './logo/logo';
require('./side-menu.css');

type ISideMenuState = {
    option_selected: number
};
interface ISideMenuProps extends RouteComponentProps<{}> {
    options: any[],
    drawer_opened: boolean,
    toggle_drawer: any,
    login_btn: any,
    history: any
};

class SideMenu extends React.Component<ISideMenuProps, ISideMenuState> {
    drawer_options: any[] = [];
    state: ISideMenuState = {
        option_selected: -1
    };

    constructor(props: ISideMenuProps) {
        super(props);
    }
    render() {
        this.drawer_options = [];
        this.props.options.forEach(option => {
            let key = Object.keys(option)[0];
            let list_key = parseInt(this.props.options.indexOf(option).toString());
            let option_classes = 'mOption';
            if (list_key === this.state.option_selected) {
                option_classes += ' option_active';
            }
            if (this.props.options.indexOf(option) === this.props.options.length - 1) {
                // si es la ultima opcion se agrega una clase para identificarlo y poder agregar un margen en la parte debajo.
                option_classes += ' last_sidebar_option';
            }
            let new_option = <ListItem className={option_classes} onClick={() => this.optionSelected(list_key, option[key][0])} button key={list_key}>
                <ListItemIcon>{option[key][1]}</ListItemIcon>
                <ListItemText primary={key}/>
            </ListItem>;
            this.drawer_options.push(new_option);
        });
        return (
            <Drawer open={this.props.drawer_opened} onClose={() => this.props.toggle_drawer()}>
                <LogoSideMenu/>
                {this.drawer_options}
                {this.props.login_btn}
            </Drawer>
        )
    }
    optionSelected(option_key: number, option_route: string) {
        this.setState({'option_selected': option_key});
        // despues de cambiar el estado de la opcion activa se redirecciona a la ruta correspondiente.
        this.props.history.push(option_route);
        // cerramos el menu lateral
        this.props.toggle_drawer();
    }
}

export default withRouter(SideMenu);

