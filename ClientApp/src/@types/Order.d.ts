interface Order {
    items: ProductOrder[];
    userId?: string;
    mobileNumber?: string;
    address?: string;
    remarks?: string;
    currency: string;
    currencyRate: number;
}