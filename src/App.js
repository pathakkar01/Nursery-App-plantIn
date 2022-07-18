import Header from "./components/Layout/Header";

import Cart from "./components/Cart/Cart";
import { useState } from "react";
import AllPlants from "./Pages/AllPlants";
import Home from "./Pages/Home";
import CartProvider from "./Store/CartProvider";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [cartIsShown, setCartIsShow] = useState(false);
  const showCartHandler = () => {
    setCartIsShow(true);
  };
  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  return (
    <>
      <CartProvider>
        {cartIsShown && <Cart onHideCart={hideCartHandler} />}
        <header>
          <Header onShowCart={showCartHandler} />
        </header>
        <main>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/plants">
              <AllPlants />
            </Route>
          </Switch>
        </main>
      </CartProvider>
    </>
  );
}

export default App;
