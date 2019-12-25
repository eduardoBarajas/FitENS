import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import 'mapbox-gl/dist/mapbox-gl.css';
import CallIcon from '@material-ui/icons/Call';
import {StaticData} from '../../utils/StaticData';
import Typography from '@material-ui/core/Typography';
require('./map.css');
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1MjMiLCJhIjoiY2psa2lpNTRzMG43azNrbzU2emYxaThtNiJ9.j20WpkbxDZbaszbFUToebg';

// definimos la interfaz de los props con los que podra trabajar el componente.
type IMapProps = {
    parentComponent?: string
};

// definimos la interfaz de los estados.
type IMapState = {
    lng: number,
    lat: number,
    zoom: number
};

class Map extends React.Component<IMapProps, IMapState> {
    mapContainer: any;
    state: IMapState = {
        lng: -116.563056,
        lat: 31.852508,
        zoom: 17,
    };

    constructor(props: IMapProps) {
        super(props);
        this.mapContainer = null;
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer"/>
            </div>
        )
    }

    componentDidMount() {
        var limites_mapa = [
            [-116.835714, 31.488703], // Southwest coordinates
            [-116.233085, 32.127540] // Northeast coordinates
        ];
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            maxBounds: limites_mapa
        });
        var popup = new mapboxgl.Popup({ closeOnClick: false })
            .setHTML(
                ReactDOMServer.renderToStaticMarkup(
                    <div>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {StaticData.businessInfo.address}
                        </Typography>
                    </div>
                )
            );
        var marker = new mapboxgl.Marker()
            .setLngLat([-116.563056, 31.852508])
            .setPopup(popup)
            .addTo(map);
    }
}

export default Map;