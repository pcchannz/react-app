interface CartState {
    items: Map<string, ProductOrder>;
    totalAmount: number;
    currencyRate: number;
}