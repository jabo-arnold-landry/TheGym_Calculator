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
        break;

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
        break;
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

      default:
        return {
          ...state,
          currValue: handleOperations(state),
          operation: action.value,
          operand: null,
        };
    }
  }
  const [{ currValue, operation, operand }, dispatch] = useReducer(reduce, {});
  return (
    <>
      <main>
        <div className="numbers">
          <div className="output">
            <div className="firstvalue-operand">
              {currValue} <span>{operation}</span>
            </div>
            <div className="currvalue-operand">{operand}</div>
          </div>

          {numbers.map((number, index) => {
            return (
              <Button
                onClick={(e) => {
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
                  const isValidDigitElement = regex.test(e.currentTarget.value);

                  dispatch({
                    type: isValidDigitElement ? "operations" : "add-digits",
                    value: e.currentTarget.value,
                  });
                }}
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
