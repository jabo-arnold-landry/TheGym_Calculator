import Button from "./UI/Button";
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

const keyPad = [
  { clsname: "operation", key: "AC" },
  { clsname: "operation", key: "-/+" },
  { clsname: "operation", key: "%" },
  { clsname: "operations", key: "/" },

  { clsname: "digit", key: "7" },

  { clsname: "digit", key: "8" },

  { clsname: "digit", key: "9" },

  { clsname: "operations", key: "x" },

  { clsname: "digit", key: "4" },

  { clsname: "digit", key: "5" },
  { clsname: "digit", key: "6" },

  { clsname: "operations", key: "-" },
  { clsname: "digit", key: "1" },

  { clsname: "digit", key: "2" },

  { clsname: "digit", key: "3" },

  { clsname: "operations", key: "+" },
  { clsname: "digit zero", key: "0" },

  { clsname: "digit", key: "." },
  { clsname: "operations", key: "=" },
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
  const [{ operand }, dispatch] = useReducer(reduce, {
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

          {keyPad.map((pad, index) => {
            const { clsname, key } = pad;
            return (
              <Button
                onClick={handleClick}
                key={index}
                value={key === "x" ? "*" : key}
                className={clsname}
              >
                {key}
              </Button>
            );
          })}
        </div>
      </main>
    </>
  );
}
