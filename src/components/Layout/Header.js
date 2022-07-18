import { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <Fragment>
      <header>
        <h1 className={classes["main-logo"]}>
          Plant<span>In</span>
        </h1>
        <div className={classes["nav"]}>
          <ul>
            <li>
              <NavLink to="./home" activeClassName={classes.active}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="./plants" activeClassName={classes.active}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="./contacts" activeClassName={classes.active}>
                Contact
              </NavLink>
            </li>
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
