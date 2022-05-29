import { Input } from "../../UI/input";
import classes from "./ProductItemForm.module.css";
import React, { useRef, useState, useContext } from 'react';
import CartContext from "../../../store/cart-context";
import { OrderType } from "../../Common/DataTypes";
export const ProductItemForm = (props: React.PropsWithChildren<{order: ProductOrder, action: OrderType}>) => {
  const cartContext = useContext(CartContext);
  let buttonElement: any;

  if (props.action === OrderType.ADD) {
    buttonElement = <button>+ Add</button>
  }
  if (props.action ===  OrderType.REMOVE) 
  {
    buttonElement = <button>Remove</button>
  }
  
  const actionHandler = (amount: number) => {
      if (props.action === OrderType.ADD) {
          cartContext.addItem({
              Product: props.order.Product,
              Quantity: amount
          })
      }
      if (props.action ===  OrderType.REMOVE) 
      {
          cartContext.removeItem(props.order.Product.id);
      }
     
  };
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>();
  const submitHandler = (event: React.FormEvent)  => {
    event.preventDefault();
    if (amountInputRef.current) {
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;

      if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 20) {
        setAmountIsValid(false);
        return;
      }
      actionHandler(enteredAmountNumber);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.order.Product.id,
          type: "number",
          min: "1",
          max: "20",
          step: "1",
          defaultValue: props.order.Quantity.toString(),
          readOnly: props.action !== OrderType.ADD
        }}
      />
      {buttonElement}
      {!amountIsValid && <p>Please enter a valid amount (1-10)</p>}
    </form>
  );
};
