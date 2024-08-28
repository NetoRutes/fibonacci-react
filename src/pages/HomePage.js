import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
    const [nValue, setNValue] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (nValue) {
            const response = await fetch('http://localhost:8000/api/v1/generate/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ n_value: parseInt(nValue, 10) }),
            });

            const data = await response.json();
            navigate('/result', { state: { fibonacciNumbers: data.fibonacci_sequence } });
        }
    };

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xs">
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Enter a Number"
                        value={nValue}
                        onChange={(e) => setNValue(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Generate Fibonacci Sequence
                    </Button>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default HomePage;