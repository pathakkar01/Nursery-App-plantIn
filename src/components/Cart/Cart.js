import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length;
  const [isSubmitting, setIsSubmittting] = useState(false);
  const [anyError, setAnyError] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amonut: 1 });
  };
  const orderHandler = () => {
    setIsCheckingOut(true);
  };
  const showCartLines = () => {
    console.log("Here");
    setIsCheckingOut(false);
  };
  const submitOrderHandler = async (userData) => {
    console.log("#####", userData);
    setIsSubmittting(true);
    const response = await fetch(
      "https://react-http-82298-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          oredredItems: cartCtx.items,
        }),
      }
    );
    setIsSubmittting(false);
    if (response.ok) {
      setDidSubmit(true);
      cartCtx.clearCart();
    } else {
      setAnyError(true);
    }
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        console.log(cartCtx.items);
        return (
          <>
            <CartItem
              Key={item.id}
              name={item.name}
              price={item.price}
              amount={item.amonut}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
            />
          </>
        );
      })}
    </ul>
  );

  const submitContent = (
    <>
      <div className={classes["wrapper"]}>
        <div id={classes.loading}></div>
        <span className={classes["loading-msg"]}>
          Sending the order data..!!
        </span>
      </div>
    </>
  );
  const cart = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems > 0 && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </>
  );
  const cartModalContent = (
    <>
      {anyError && (
        <p className={classes.error}>
          Somthing went wrong!! Please try Again...
        </p>
      )}
      {isCheckingOut && !isSubmitting && (
        <Checkout
          onCancel={props.onHideCart}
          showCartLines={showCartLines}
          onConfrim={submitOrderHandler}
        ></Checkout>
      )}
      {!isCheckingOut && cart}
    </>
  );

  const didSubmitModalContent = (
    <>
      <p className={classes.success}>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submitContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
