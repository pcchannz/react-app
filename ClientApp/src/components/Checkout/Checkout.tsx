import classes from './Checkout.module.css';
import { ProductItem } from '../Products/ProductItem/ProductItem';
import { Currency, OrderType } from '../Common/DataTypes';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CartContext from '../../store/cart-context';
import { ProductItemForm } from '../Products/ProductItem/ProductItemForm';
const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const [shippingAmount, setShippingAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const productOrders = cartCtx.items;

    const postOrder = async(url: string) => {
      let order: Order = {
        items: Array.from(productOrders.values()),
        currency: Currency[cartCtx.currencyRate],
        currencyRate: cartCtx.currencyRate
      };
      const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(order),
          headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      return response;
    }

    const postData = async () => {
      
      const response = await postOrder('cart');
      const data = await response.json();
      setShippingAmount(data);
      setIsLoading(false);
    };

    useEffect(() => {
        postData().catch((error) => {
            setIsLoading(false);
        });
        
    }, [cartCtx])

    const orderHandler = async () => {
      const response = await postOrder("cart/order");
      const data = await response.json();
      console.log(data);
      if (data) {
        cartCtx.clear();
        history.push('thankyou');
      }
    };

    
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
              <button onClick={orderHandler}>Order</button>
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
