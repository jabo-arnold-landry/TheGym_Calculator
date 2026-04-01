import Button from "./UI/Button";
import { clsx } from "clsx";
import { useReducer } from "react";
import { type Str } from "../types";
interface InputType {
  currValue: Str;
  operation: Str;
  operand: Str;
}

interface ActionType {
  type: Str;
  value?: Str;
}

const numbers = [
  "AC",
  "+/-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

export default function Calculator() {
  function handleOperations({ currValue, operation, operand }: InputType) {
    const numOne = parseInt(currValue);
    const numTwo = parseInt(operand);
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

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.value === "AC")
      return dispatch({
        type: "clear",
      });

    if (e.currentTarget.value === "=")
      return dispatch({
        type: "equals",
      });

    if (e.currentTarget.value === "+/-")
      return dispatch({
        type: "addingBooleanoperator",
      });

    const regex = /([\W])/gm;
    const isValidDigitElement = regex.test(e.currentTarget.value); // this regex returns a boolean value ,which I  use to decide if a certain value is a number or a special character if it is a special character I make it an operations and when it is not I make it an add-digits.

    dispatch({
      type: isValidDigitElement ? "operations" : "add-digits",
      value: e.currentTarget.value,
    });
  }

  function reduce(state: InputType, action: ActionType) {
    switch (action.type) {
      case "add-digits":
        if (action.value === "0" && state.operand === "0") return state;
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
  const [{ currValue, operation, operand }, dispatch] = useReducer(reduce, {
    currValue: null,
    operation: null,
    operand: null,
  });
  return (
    <>
      <main>
        <div className="numbers">
          <div className="output">
            <div className="currvalue-operand">{operand}</div>
          </div>

          {numbers.map((number, index) => {
            return (
              <Button
                onClick={handleClick}
                key={index}
                value={number === "x" ? "*" : number}
                className={clsx(number === "0" && "zero")}
              >
                {number}
              </Button>
            );
          })}
        </div>
      </main>
    </>
  );
}
