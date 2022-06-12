import Header from "./components/Layout/Header";
import PlantList from "./components/Plant/PlantList";
import Cart from "./components/Cart/Cart";
import { useCallback, useEffect, useState } from "react";
import CartProvider from "./Store/CartProvider";

function App() {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchPlantHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://react-http-82298-default-rtdb.firebaseio.com/Plant.json"
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const data = await response.json();
      console.log(data);
      setPlants(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setHttpError(error);
    }
  }, []);

  useEffect(() => {
    fetchPlantHandler();
  }, [fetchPlantHandler]);

  console.log(JSON.stringify(plants));

  const [cartIsShown, setCartIsShow] = useState(false);
  const showCartHandler = () => {
    setCartIsShow(true);
  };
  const hideCartHandler = () => {
    setCartIsShow(false);
  };
  const loadingContent = (
    <>
      <div className={"wrapper"}>
        <div id={"loading"}></div>
      </div>
    </>
  );
  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      {httpError && <p className="LoadingState">{httpError.message}...</p>}
      {isLoading && loadingContent}
      {!isLoading && <PlantList plants={plants} isLoading={isLoading} />}
    </CartProvider>
  );
}

export default App;
