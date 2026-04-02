import { type InputType, type ActionType } from "../types";
import { type Dispatch } from "react";

function handleOperations({ currValue, operation, operand }: InputType) {
  const numOne = Number(currValue);
  const numTwo = Number(operand);
  
  switch (operation) {
    case "+":
      return numOne + numTwo;

    case "-":
      return numOne - numTwo;

    case "/":
      return numOne / numTwo;

    case "*":
      return numOne * numTwo;

    case "%":
      return numOne % numTwo;

    default:
      return alert("invalid inputs");
  }
}

export function handleClick(
  e: React.MouseEvent<HTMLButtonElement>,
  dispatch: Dispatch<ActionType>,
) {
  if (e.currentTarget.value === "AC")
    return dispatch({
      type: "clear",
    });

  if (e.currentTarget.value === "=")
    return dispatch({
      type: "equals",
    });

  if (e.currentTarget.value === "-/+")
    return dispatch({
      type: "addingBooleanoperator",
    });

  if (e.currentTarget.value === ".")
    return dispatch({
      type: "add-digits",
      value: e.currentTarget.value,
    });

  const regex = /([\W])/gm;
  const isValidDigitElement = regex.test(e.currentTarget.value); // this regex test returns a boolean value ,which I  use to decide if a certain value is a number or a special character if it is a special character I make it an operations and when it is not I make it an add-digits.

  dispatch({
    type: isValidDigitElement ? "operations" : "add-digits",
    value: e.currentTarget.value,
  });
}

export function handleReducerActions(state: InputType, action: ActionType) {
  switch (action.type) {
    case "add-digits":
      if (
        (action.value === "." && state.operand == null) ||
        state.operand == ""
      )
        return state;
      if (action.value === "0" && state.operand === "") return state;
      if (action.value === "." && state.operand.includes(".")) return state;
      return {
        ...state,
        operand: `${state.operand ?? ""}${action.value}`,
      };

    case "clear":
      return {
        currValue: "",
        operand: "",
        operation: "",
      };

    case "operations":
      if (state.currValue == null && state.operand == null) return state;
      if (state.currValue == null) {
        return {
          ...state,
          currValue: state.operand,
          operation: action.value,
          operand: null,
        };
      }

      return {
        ...state,
        currValue: handleOperations(state),
        operation: action.value,
        operand: null,
      };

    case "equals":
      if (state.currValue == null && state.operand == null) return state;
      if (state.currValue !== null && state.operand !== null) {
        return {
          ...state,
          currValue: null,
          operation: null,
          operand: handleOperations(state),
        };
      }
      return state;

    case "addingBooleanoperator":
      if (state.currValue == null && state.operand == null) return state;
      if (state.operand.startsWith("-")) {
        return {
          ...state,
          operand: Math.abs(parseInt(state.operand)),
        };
      }
      return {
        ...state,
        operand: `-${state.operand}`,
      };
  }
}
