import { Fragment, useContext } from 'react';
import CartContext from '../../../store/cart-context';
import styles from './ProductItem.module.css';
export const ProductItem = (props: React.PropsWithChildren<{product : Product}>) => {
    const cartCtx = useContext(CartContext);

    return (
        <Fragment>
            <div>
                <h3>{props.product.name}</h3>
                <div className={styles.description}>{props.product.description}</div>
                <div className={styles.price}>{cartCtx.getDisplayPrice(props.product.price)}</div>
            </div>
        </Fragment>    
    );
}