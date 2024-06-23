import { render, fireEvent } from '@testing-library/react';
import { Footer } from './Footer';

test('renders footer', () => {
    const { getByText } = render(<Footer />);
    const footerElement = getByText('Some footer info');
    const buttonElement = getByText('Go to Top');

    expect(footerElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
});

test('scrolls to top on button click', () => {
    window.scrollTo = jest.fn();

    const { getByText } = render(<Footer />);
    const buttonElement = getByText('Go to Top');

    fireEvent.click(buttonElement);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
});
