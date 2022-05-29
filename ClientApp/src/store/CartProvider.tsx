import { OrderType } from "../components/Common/DataTypes";
import CartContext, { defaultCartState } from "./cart-context";
import { useReducer } from "react";
import { getTotalAmountFromProductOrders } from "../components/Common/Calculator";

interface CartStateAction {
    type: OrderType;
    item?: ProductOrder;
    id?: string;
    value?: number;
}

const cartReducer = (state: CartState, action: CartStateAction) => {
    if (action.type === OrderType.ADD && action.item !== undefined) {
        let newStateItems = new Map<string, ProductOrder>(state.items);

        if (newStateItems.has(action.item.Product.id)) {
            let item = newStateItems.get(action.item.Product.id)!;
            item.Quantity += action.item.Quantity;
            newStateItems.set(action.item.Product.id, item);
        } else {
            newStateItems.set(action.item.Product.id, action.item);
        }

        return {
            ...state,
            items: newStateItems,
            totalAmount: getTotalAmountFromProductOrders(newStateItems),
        };
    }

    if (action.type === OrderType.REMOVE && action.id) {
        let newStateItems = new Map<string, ProductOrder>(state.items);

        if (newStateItems.has(action.id)) {
            newStateItems.delete(action.id);
            return {
                ...state,
                items: newStateItems,
                totalAmount: getTotalAmountFromProductOrders(newStateItems),
            };
        }
    }

    if (action.type === OrderType.UPDATE_CURRENCY && action.value) {
        return {
            ...state,
            currencyRate: action.value
        }
    }

    if (action.type === OrderType.DONE) {
        return {
            ...state,
            items: new Map<string, ProductOrder>()
        }
    }

    return defaultCartState;
};

const CartProvider = (props: React.PropsWithChildren<{}>) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item: ProductOrder) => {
        dispatchCartAction({ type: OrderType.ADD, item: item });
    };
    const removeItemFromCartHandler = (id: string) => {
        dispatchCartAction({ type: OrderType.REMOVE, id: id });
    };

    const setCurrenyRateHandler = (value: number) => {
        dispatchCartAction({ type: OrderType.UPDATE_CURRENCY, value: value});
    };

    const clearHandler = () => {
        dispatchCartAction({ type: OrderType.DONE})
    }
    const getDisplayPrice = (value: number) => `$${(value*+cartState.currencyRate).toFixed(2)}`;

    
    const cartContext: Cart = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        getDisplayPrice: getDisplayPrice,
        setCurrencyRate: setCurrenyRateHandler,
        clear: clearHandler,
        currencyRate: cartState.currencyRate,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
