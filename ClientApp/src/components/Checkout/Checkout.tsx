import classes from './Checkout.module.css';
import { ProductItem } from '../Products/ProductItem/ProductItem';
import { Currency, OrderType } from '../Common/DataTypes';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import { ProductItemForm } from '../Products/ProductItem/ProductItemForm';
const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const [shippingAmount, setShippingAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    const productOrders = cartCtx.items;
    useEffect(() => {
        const postData = async () => {
            let order: Order = {
              items: Array.from(productOrders.values()),
              currency: Currency[cartCtx.currencyRate],
              currencyRate: cartCtx.currencyRate
            };
            const response = await fetch('cart', {
                method: 'POST',
                body: JSON.stringify(order),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
              throw new Error("Something went wrong!");
            }
        
            const data = await response.json();
            setShippingAmount(data);
            setIsLoading(false);
          };
      
        postData().catch((error) => {
            setIsLoading(false);
        });
        
    }, [cartCtx])
    if (isLoading) {
        return (
          <section>
            <p>Loading...</p>
          </section>
        );
      }

    return (
        <div>
            <div className={classes.total}>
                <span>Product Amount: {cartCtx.getDisplayPrice(cartCtx.totalAmount)}</span>
            </div>
            <div className={classes.total}>
              <div>Shipping: {cartCtx.getDisplayPrice(shippingAmount/cartCtx.currencyRate)}</div>
            </div>
            <div className={classes.total}>
              <div>Total amount: {cartCtx.getDisplayPrice(cartCtx.totalAmount + shippingAmount/cartCtx.currencyRate)}</div>
            </div>    
            <div className={classes.actions}>
              <button>Checkout</button>
            </div>
            <ul>
                {Array.from(productOrders.values()).map((productOrder) => 
                <li key={productOrder.Product.id} className={classes['cart-items']}>
                    <ProductItem product={productOrder.Product} />
                    <ProductItemForm order={productOrder} action={OrderType.REMOVE} />
                </li>
                )}
            </ul>
        </div>
        
    );
};
export default Checkout
