import { render, screen } from "@testing-library/react";
import Products from "./Products";

describe('Products component', () => {
    test('render products', async() => {
        // Arrange
        const mockProducts: Product[] = [{
            id: "1",
            name: "1",
            description: "1",
            price: 1,
            publishedDateTime: "1",
            expiredDateTime: "1"
        }]
        const mockFunction = jest.fn();
        mockFunction.mockResolvedValueOnce({
            json: async() => mockProducts,
            ok: true
        })
        window.fetch = mockFunction;
        render(<Products />);

        // Act
        const productListElements = await screen.findAllByRole('spinbutton');

        // Assert
        expect(productListElements).not.toHaveLength(0);

    })
});