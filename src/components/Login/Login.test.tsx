import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Login } from './Login';

describe('Login Component', () => {
    it('should log in successfully', async () => {

        render(<Login />, {
            wrapper: MemoryRouter,
        });

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'admin' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: '12345' },
        });

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(localStorage.getItem('userData')).toBeTruthy();
        });
    });

    it('should display error messages for incorrect login', async () => {
        render(<Login />, {
            wrapper: MemoryRouter,
        });

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'invalid' },
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Incorrect email entry.')).toBeInTheDocument();
            expect(screen.getByText('Incorrect password entry.')).toBeInTheDocument();
        });
    });
});
