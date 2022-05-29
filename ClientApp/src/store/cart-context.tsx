import React from 'react';

export const defaultCartState: CartState = {
    items: new Map<string, ProductOrder>(),
    totalAmount: 0,
    currencyRate: 1
}

const CartContext = React.createContext<Cart>({
    ...defaultCartState,
    addItem: (item: ProductOrder) => {},
    removeItem: (id: string) => {},
    getDisplayPrice: (value: number) => "",
    setCurrencyRate: (value: number) => {},
    clear: () => {}
});

export default CartContext;