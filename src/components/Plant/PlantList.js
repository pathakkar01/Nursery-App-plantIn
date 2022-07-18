import classes from "./PlantList.module.css";
import { useEffect, useState, useCallback } from "react";
import Plant from "./Plant";

const PlantList = (props) => {
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

  const loadingContent = (
    <>
      <div className={"wrapper"}>
        <div id={"loading"}></div>
      </div>
    </>
  );

  return (
    <>
      {httpError && <p className="LoadingState">{httpError.message}...</p>}
      {isLoading && loadingContent}
      {!isLoading && (
        <ul className={classes["plants"]}>
          {plants.map((plant) => {
            return (
              <Plant
                key={plant.id}
                id={plant.id}
                name={plant.name}
                img={plant.img}
                price={plant.price}
                rating={plant.rating}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default PlantList;
