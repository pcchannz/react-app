import { render, screen, act } from '@testing-library/react';
import Checkout from './Checkout';

test('renders shipping amount', () => {
    render(<Checkout></Checkout>);
    const linkElement = screen.getByText(/Shipping/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders total amount', () => {
    render(<Checkout></Checkout>);
    const linkElement = screen.getByText(/Total amount/i);
    expect(linkElement).toBeInTheDocument();
});
