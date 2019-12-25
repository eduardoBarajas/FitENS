import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

type IContactoDetailsProps = {
    show?: boolean
};

const ContactoDetails: React.FC<IContactoDetailsProps> = (props) => {
    let elements = 
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>Contacto</Typography>
            </Container>
        </React.Fragment>;
    return (elements);
}

export default ContactoDetails;