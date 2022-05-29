import { render, screen, waitFor } from '@testing-library/react';
import userevent from '@testing-library/user-event';
import Checkout from './Checkout';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Checkout component', () => {
    test('renders loading text on load', async() => {
        // Arrange
        const mockFunction = jest.fn();
        mockFunction.mockResolvedValueOnce({
            json: async() => 0,
            ok: true
        })
        window.fetch = mockFunction;
        render(<Checkout />);

        // Act 
        const outputElement = screen.getByText(/loading/i);

        // Assert
        expect(outputElement).toBeInTheDocument();
        await waitFor(() => {
            expect(outputElement).not.toBeInTheDocument();
        })
        
    });

    test('renders shipping amount', async() => {
        // Arrange
        render(<Checkout />);
    
        // Act
        const outputElement = await screen.findByText(/Shipping/i);
    
        // Assert
        expect(outputElement).toBeInTheDocument();
    });
    
    test('renders total amount', async() => {
        // Arrange
        render(<Checkout />);
    
        // Act
        const outputElement = await screen.findByText(/Total amount:/i);
    
        // Assert
        expect(outputElement).toBeInTheDocument();
    });

    test('button click on order, route to thank you page', async() => {
        // Arrange
        const mockFunction = jest.fn();
        mockFunction.mockResolvedValue({
            json: async() => true,
            ok: true
        })
        window.fetch = mockFunction;
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, 'push');
        
        render(
            <Router history={history}>
                <Checkout />
            </Router> 
        );

        // Act
        const buttonElement = await screen.findByRole('button');
        userevent.click(buttonElement);

        // Assert
        await waitFor(() => {
            expect(pushSpy).toHaveBeenCalledWith('thankyou');
        });
        
    })
})
