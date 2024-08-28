import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer: React.FC = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', p: 2, mt: 'auto', textAlign: 'center' }}>
            <Typography variant="body1" color="white">
                © BioHub - Fibonacci App
            </Typography>
        </Box>
    );
};

export default Footer;
