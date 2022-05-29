import { render, screen } from '@testing-library/react';

import Checkout from './Checkout';

describe('Checkout component', () => {
    test('renders loading text on load', () => {
        // Arrange
        render(<Checkout />);

        // Act 
        const outputElement = screen.getByText(/loading/i);

        // Assert
        expect(outputElement).toBeInTheDocument();
    });

    test('renders shipping amount', () => {
        // Arrange
        render(<Checkout></Checkout>);
    
        // Act
        const outputElement = screen.getByText(/Shipping/i);
    
        // Assert
        expect(outputElement).toBeInTheDocument();
    });
    
    test('renders total amount', () => {
        // Arrange
        render(<Checkout></Checkout>);
    
        // Act
        const outputElement = screen.getByText(/Total amount:/i);
    
        // Assert
        expect(outputElement).toBeInTheDocument();
    });
})
