import { Fragment, useContext } from 'react';
import CartContext from '../../../store/cart-context';
import styles from './ProductItem.module.css';
export const ProductItem = (props: React.PropsWithChildren<{product : Product}>) => {
    const cartCtx = useContext(CartContext);
    const getCurrencyValue = (value: number) => `$${(value*+cartCtx.currencyRate).toFixed(2)}`;

    return (
        <Fragment>
            <div>
                <h3>{props.product.name}</h3>
                <div className={styles.description}>{props.product.description}</div>
                <div className={styles.price}>{getCurrencyValue(props.product.price)}</div>
            </div>
        </Fragment>    
    );
}