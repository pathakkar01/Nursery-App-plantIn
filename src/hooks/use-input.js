import { useReducer } from "react";
const intialInput = {
  value: "",
  isToched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isToched: state.isToched,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isToched: true,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isToched: false,
    };
  }
  return {
    value: "",
    isToched: false,
  };
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputReducer, intialInput);
  const valueIsValid = validateValue(inputState.value);
  const hasError = inputState.isToched && !valueIsValid;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const blurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };
  return {
    value: inputState.value,
    hasError,
    IsValid: valueIsValid,
    valueChangeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
