import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';

// Mock the navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('HomePage Component', () => {
    beforeEach(() => {
        fetch.resetMocks();
        mockNavigate.mockReset();
    });

    it('renders Navbar, Footer, and form elements correctly', () => {
        render(<HomePage />);

        expect(screen.getByText(/Fibonacci Sequence Generator/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter a Number/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Generate Fibonacci Sequence/i })).toBeInTheDocument();
        expect(screen.getByText(/© BioHub - Fibonacci App/i)).toBeInTheDocument();
    });

    it('updates input value correctly', () => {
        render(<HomePage />);

        const inputElement = screen.getByLabelText(/Enter a Number/i);
        fireEvent.change(inputElement, { target: { value: '5' } });
        
        expect(inputElement.value).toBe('5');
    });

    it('calls fetch and navigates to result page on valid submission', async () => {
        // Mock the API response
        fetch.mockResponseOnce(JSON.stringify({ fibonacci_sequence: [0, 1, 1, 2, 3] }));

        render(<HomePage />);

        const inputElement = screen.getByLabelText(/Enter a Number/i);
        const submitButton = screen.getByRole('button', { name: /Generate Fibonacci Sequence/i });

        fireEvent.change(inputElement, { target: { value: '5' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/v1/generate/', expect.any(Object));
            expect(mockNavigate).toHaveBeenCalledWith('/result', { state: { fibonacciNumbers: [0, 1, 1, 2, 3] } });
        });
    });

    it('does not call fetch or navigate on empty input', async () => {
        render(<HomePage />);

        const submitButton = screen.getByRole('button', { name: /Generate Fibonacci Sequence/i });
        fireEvent.click(submitButton);

        expect(fetch).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
