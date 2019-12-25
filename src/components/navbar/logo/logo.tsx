import React from 'react';
import Typography from '@material-ui/core/Typography';
require('./logo.css');

type ILogoProps = {
    show?: boolean
};

const Logo: React.FC<ILogoProps> = (props) => {
    return (
        <div>
            <Typography variant="h5" className={'appName'}>
                FitENS
            </Typography>
        </div>
    )
}
export default Logo;