interface Cart extends CartState {
    addItem: (item: ProductOrder) => void;
    removeItem: (id: string) => void;
    getDisplayPrice: (value: number) => string;
    setCurrencyRate: (value: number) => void;
}