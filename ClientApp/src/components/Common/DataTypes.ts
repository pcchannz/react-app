/**
 * Conversion rate as of 28th May 2022. TODO: Get it from live api
*/
export enum Currency {
    AUD = 1, 
    NZD = 1.1, 
    USD = 0.72
}

export enum OrderType {
    ADD, REMOVE, UPDATE_CURRENCY, DONE
}
