import React from 'react';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const StaticData = {
    home: {
        benefits: {
            grid_elements: [
                {
                    key: 1,
                    title: 'Saludable',
                    text: 'Los alimentos que ofrecemos te ayudaran a mejorar tu salud.',
                    icon: <FavoriteIcon className={'benefit_spotlight_icon'}/>
                },
                {
                    key: 2,
                    title: 'Economico',
                    text: 'Ofrecemos una gran variedad de alimentos de los cuales.',
                    icon: <MonetizationOnIcon className={'benefit_spotlight_icon'}/>
                }, 
                {
                    key: 3,
                    title: 'Pensado para ti',
                    text: 'En FitENS te ayudamos a desarrollar un plan para que mejores',
                    icon: <EmojiPeopleIcon className={'benefit_spotlight_icon'}/>
                }
            ]
        },
        challenge: {
            grid_elements: [
                {
                    key: 1,
                    image: require('../assets/images/ejercicios.png'),
                    body: 'Conoce ejercicios que te ayudaran a conseguir un estilo de vida mas saludable, y lo que es mejor muchos podras realizarlos sin salir de tu casa.',
                    route: '/Ejercicios'
                },
                {
                    key: 2,
                    image: require('../assets/images/comida.png'),
                    body: 'Entra a nuestro recetario y conoce que comidas son lo mejor para ti dependiendo de tus metas.',
                    route: '/Recetario'
                }
            ]
        },
    },
    businessInfo: {
        images: [
            {
                key: 1,
                image: require('../assets/images/local1.jpg')
            }
        ],
        address: 'Avenida siempre viva, springfield 2011, Estados Unidos',
        telephone: '(646) 204-22-12',
        scheduleTimeStart: '8:00 AM',
        scheduleTimeEnd: '8:00 PM',
        scheduleDate: 'Lun - Dom',
        orderAvailableStatus: 'Pedidos En Linea Disponibles',
        contactEmail: 'administracion@fitens.com',
        facebookPage: 'https://www.facebook.com/fit-ens',
        instagramPage: 'https://www.facebook.com/fit-ens',
        whatssapNumber: '(646) 204-22-12',
        legal: 'Todos los derechos reservados FitEns 2020.'
    },
    menu: {
        search_title_label: 'Encuentra el alimento ideal.',
        search_fields: [
            {'key': 1, 'type': 'input', 'id': 'nombreComida', 'label': 'Nombre Comida', 'rowSize': 12}, 
            {'key': 2, 'type': 'input', 'id': 'desdeKcal', 'label': 'Desde (KCal)', 'rowSize': 6}, {'key': 3, 'type': 'input', 'id': 'hastaKcal', 'label': 'Hasta (Kcal)', 'rowSize': 6}, 
            {'key': 4, 'type': 'input', 'id': 'desdePrecio', 'label': 'Desde ($)', 'rowSize': 6}, {'key': 5, 'type': 'input', 'id': 'hastaPrecio', 'label': 'Hasta ($)', 'rowSize': 6}
        ]
    },
    ejercicios: {
        search_title_label: 'Encuentra el ejercicio ideal para ti.',
        search_fields: [
            {'key': 1, 'type': 'input', 'id': 'nombreEjercicio', 'label': 'Nombre Ejercicio', 'rowSize': 12}, 
            {'key': 2, 'type': 'input', 'id': 'minKcalPorHora', 'label': 'Calorias quemadas minimas (hr)', 'rowSize': 6},
            {'key': 3, 'type': 'select', 'id': 'tipoEsfuerzo', 'label': 'Tipo de esfuerzo', 'rowSize': 6, 'select_options': [{'key': 1, 'label': 'Leve'}, {'key': 2, 'label': 'Moderado'}, {'key': 3, 'label': 'Intensivo'}]}, 
            {'key': 4, 'type': 'select', 'id': 'lugarIdeal', 'label': 'Lugar ideal', 'rowSize': 6, 'select_options': [{'key': 1, 'label': 'Hogar'}, {'key': 2, 'label': 'Exterior'}, {'key': 3, 'label': 'Gimnasio'}]}
        ]
    },
    pedidos: {
        search_title_label: 'Encuentra tus pedidos.',
        search_fields: [
            {'key': 1, 'type': 'input', 'id': 'nombreComida', 'label': 'Nombre Comida', 'rowSize': 12}, 
            {'key': 2, 'type': 'input', 'id': 'fechaCompra', 'label': 'Fecha Compra', 'rowSize': 6}, {'key': 3, 'type': 'input', 'id': 'desdePrecio', 'label': 'Desde ($)', 'rowSize': 6}, 
            {'key': 4, 'type': 'input', 'id': 'hastaPrecio', 'label': 'Hasta ($)', 'rowSize': 6}
        ]
    }
}