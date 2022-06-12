import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    blurHandler: nameBlurHandler,
    IsValid: nameIsValid,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredStreet,
    hasError: streetInputHasError,
    valueChangeHandler: streetInputChangeHandler,
    blurHandler: streetBlurHandler,
    IsValid: streetIsValid,
    reset: streetReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredCity,
    hasError: cityInputHasError,
    valueChangeHandler: cityInputChangeHandler,
    blurHandler: cityBlurHandler,
    IsValid: cityIsValid,
    reset: cityReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredState,
    hasError: stateInputHasError,
    valueChangeHandler: stateInputChangeHandler,
    blurHandler: stateBlurHandler,
    IsValid: stateIsValid,
    reset: stateReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCountry,
    hasError: countryInputHasError,
    valueChangeHandler: countryInputChangeHandler,
    blurHandler: countryBlurHandler,
    IsValid: countryIsValid,
    reset: countryReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeInputChangeHandler,
    blurHandler: postalCodeBlurHandler,
    IsValid: postalCodeIsValid,
    reset: postalCodeReset,
  } = useInput((value) => value.trim() !== "");

  const confirmHandler = (event) => {
    event.preventDefault();
    const formIsValid =
      postalCodeIsValid &&
      countryIsValid &&
      stateIsValid &&
      nameIsValid &&
      streetIsValid &&
      cityIsValid;
    if (!formIsValid) {
      return;
    }

    props.onConfrim({
      name: enteredName,
      street: enteredCity,
      city: enteredCity,
      state: enteredState,
      counter: enteredCountry,
      postalCode: enteredPostalCode,
    });
    postalCodeReset();
    nameReset();
    cityReset();
    streetReset();
    stateReset();
    countryReset();
  };

  const nameControlClasses = `${classes.control} ${
    !nameInputHasError ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    !streetInputHasError ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    !cityInputHasError ? "" : classes.invalid
  }`;
  const countryControlClasses = `${classes.control} ${
    !countryInputHasError ? "" : classes.invalid
  }`;
  const stateControlClasses = `${classes.control} ${
    !stateInputHasError ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !postalCodeInputHasError ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          country
          value={enteredName}
          onBlur={nameBlurHandler}
          onChange={nameInputChangeHandler}
        />
        {nameInputHasError && (
          <p className={classes["error-text"]}>Name must not be empty</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onBlur={streetBlurHandler}
          onChange={streetInputChangeHandler}
        />
        {streetInputHasError && (
          <p className={classes["error-text"]}>Street must not be empty</p>
        )}
      </div>
      <div className={classes["two-cols"]}>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={enteredCity}
            onBlur={cityBlurHandler}
            onChange={cityInputChangeHandler}
          />
          {cityInputHasError && (
            <p className={classes["error-text"]}>City must not be empty</p>
          )}
        </div>
        <div className={stateControlClasses}>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={enteredState}
            onBlur={stateBlurHandler}
            onChange={stateInputChangeHandler}
          />
          {stateInputHasError && (
            <p className={classes["error-text"]}>State must not be empty</p>
          )}
        </div>
      </div>
      <div className={classes["two-cols"]}>
        <div className={countryControlClasses}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={enteredCountry}
            onBlur={countryBlurHandler}
            onChange={countryInputChangeHandler}
          />
          {countryInputHasError && (
            <p className={classes["error-text"]}>Country must not be empty</p>
          )}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            value={enteredPostalCode}
            onBlur={postalCodeBlurHandler}
            onChange={postalCodeInputChangeHandler}
          />
          {postalCodeInputHasError && (
            <p className={classes["error-text"]}>
              Postal Code must not be empty
            </p>
          )}
        </div>
      </div>

      <div className={classes.actions}>
        <button className={classes.back} onClick={props.showCartLines}>
          Back
        </button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
