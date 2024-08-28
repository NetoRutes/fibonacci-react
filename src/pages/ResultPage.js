import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Button, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './ResultPage.css'

const ResultPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { fibonacciNumbers } = location.state;

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="sm">
                <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Fibonacci Sequence:
                    </Typography>
                    <Typography variant="body1" className="fibonacci-sequence">
                        {fibonacciNumbers}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        onClick={() => navigate('/')}
                    >
                        Generate Another Sequence
                    </Button>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default ResultPage;