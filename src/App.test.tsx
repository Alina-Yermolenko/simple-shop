import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders header', () => {
  const { getByText } = render(<App />, { wrapper: MemoryRouter });
  const headerElement = getByText(/Logo/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders home page', () => {
  const { getByText } = render(<App />, { wrapper: MemoryRouter });
  const homeElement = getByText(/Login/i);
  expect(homeElement).toBeInTheDocument();
});
