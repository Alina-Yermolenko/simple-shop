import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('renders button text', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<Button onClick={() => { }}>{buttonText}</Button>);
    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
});

test('calls onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
});
