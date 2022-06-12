import classes from "./Plant.module.css";
import Button from "../UI/Button/Button";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";

const Plant = (props) => {
  // const addCartButtonRef = useRef();
  const cartCtx = useContext(CartContext);
  const submitHandler = (event) => {
    cartCtx.addItem({
      key: props.id,
      id: props.id,
      name: props.name,
      amonut: 1,
      price: props.price,
    });
  };

  return (
    <li className={classes["plant"]}>
      <div className={classes["plant-img"]}>
        <img src={`../Assets/${props.img}`} alt={props.name} />
      </div>
      <p className={classes["plant-price"]}>₹{props.price}</p>
      <h4 className={classes["plant-name"]}>{props.name}</h4>

      <Button onClick={submitHandler}>Add to Cart</Button>
    </li>
  );
};

export default Plant;
