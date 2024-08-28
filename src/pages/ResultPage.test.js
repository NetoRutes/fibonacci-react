import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResultPage from './ResultPage';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

describe('ResultPage Component', () => {
    const mockNavigate = jest.fn();
    const mockLocation = {
        state: {
            fibonacciNumbers: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
        },
    };

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        useLocation.mockReturnValue(mockLocation);
    });

    it('renders the Fibonacci sequence correctly', () => {
        render(<ResultPage />);

        expect(screen.getByText(/Fibonacci Sequence:/i)).toBeInTheDocument();
        
        expect(screen.getByText(/0/i)).toBeInTheDocument();
        expect(screen.getByText(/1/i)).toBeInTheDocument();
        expect(screen.getByText(/2/i)).toBeInTheDocument();
        expect(screen.getByText(/3/i)).toBeInTheDocument();
        expect(screen.getByText(/5/i)).toBeInTheDocument();
        expect(screen.getByText(/8/i)).toBeInTheDocument();
        expect(screen.getByText(/13/i)).toBeInTheDocument();
        expect(screen.getByText(/21/i)).toBeInTheDocument();
        expect(screen.getByText(/34/i)).toBeInTheDocument();
    });

    it('navigates to the home page when "Generate Another Sequence" button is clicked', () => {
        render(<ResultPage />);

        const buttonElement = screen.getByRole('button', { name: /Generate Another Sequence/i });
        fireEvent.click(buttonElement);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('renders Navbar and Footer components', () => {
        render(<ResultPage />);

        expect(screen.getByText(/Fibonacci Sequence Generator/i)).toBeInTheDocument();
        expect(screen.getByText(/© BioHub - Fibonacci App/i)).toBeInTheDocument();
    });
});
