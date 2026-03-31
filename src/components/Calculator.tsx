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
  value: Str;
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
  function reduce(state: InputType, action: ActionType) {
    switch (action.type) {
      case "add-digits":
        const values = action.value;
        if (values === "0" && state.operand === "0") return state;
        if (values === "." && state.operand.includes(".")) return state;
        return {
          ...state,
          operand: `${state.operand ?? ""}${values}`,
        };
      case "operations":
        return {
          ...state,
          operation: action.value,
          currValue: state.operand,
          operand: "",
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
              {currValue} {operation}
            </div>
            <div className="currvalue-operand">{operand}</div>
          </div>

          {numbers.map((number, index) => {
            return (
              <Button
                onClick={(e) => {
                  const regex = /([\/\+\-\*\=])/gm;
                  const isValidDigitElemen = regex.test(
                    e.currentTarget.textContent,
                  );
                  dispatch({
                    type: isValidDigitElemen ? "operations" : "add-digits",
                    value: e.currentTarget.textContent,
                  });
                }}
                key={index}
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
