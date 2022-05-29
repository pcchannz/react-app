export const getTotalAmountFromProductOrders = (productOrders: Map<string, ProductOrder>) => {
    return Array.from(productOrders.values()).reduce(
        (currentValue, item) => currentValue + item.Quantity * item.Product.price, 0)
}

export const getTotalCartItems = (productOrders: Map<string, ProductOrder>) => {
    return Array.from(productOrders.values()).reduce(
    (curNumber, item) => curNumber + item.Quantity, 0)
}