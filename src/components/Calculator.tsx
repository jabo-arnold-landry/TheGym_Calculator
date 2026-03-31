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
  number: Str;
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
        const values = action.number;
        return {
          ...state,
          currValue: `${state.currValue ?? ""}${values}`,
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
                  dispatch({
                    type: "add-digits",
                    number: e.currentTarget.textContent,
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
