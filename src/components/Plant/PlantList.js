import classes from "./PlantList.module.css";
import Plant from "./Plant";

const PlantList = (props) => {
  return (
    <ul className={classes["plants"]}>
      {props.plants.map((plant) => {
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
  );
};

export default PlantList;
