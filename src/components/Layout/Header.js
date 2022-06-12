import { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header>
        <h1 className={classes["main-logo"]}>
          Plant<span>In</span>
        </h1>
        <div className={classes["nav"]}>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className={classes["cart"]}>
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
