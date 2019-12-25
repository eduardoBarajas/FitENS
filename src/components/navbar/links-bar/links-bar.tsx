import React, {useState} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
require('./links-bar.css');

interface ILinksBarProps extends RouteComponentProps<{}> {
    tabs: any[],
    history: any
};

const LinksBar: React.FC<ILinksBarProps> = (props) => {
    let tabs_to_render: any[] = [];
    const [active_tab, setActiveTab] = useState(-1);
    props.tabs.forEach(tab => {
        let key = Object.keys(tab)[0];
        let tab_classes = 'mTab';
        let current_tab = parseInt(props.tabs.indexOf(tab).toString());
        if (active_tab === current_tab) {
            tab_classes += ' tab_active';
        }
        let new_tab = <Tab onClick={() => {
                let tab_key = current_tab;
                setActiveTab(tab_key);
                // despues de cambiar el estado del tab activo se redirecciona a la ruta correspondiente.
                props.history.push(tab[key][0]);
            }
        } className={tab_classes} icon={tab[key][1]} key={current_tab} label={key}/>
        tabs_to_render.push(new_tab);
    });
    return (
        <Tabs 
            variant="fullWidth"
            value={false}
            aria-label="simple tabs example">
            {tabs_to_render}
        </Tabs>
    )
}

export default withRouter(LinksBar);
