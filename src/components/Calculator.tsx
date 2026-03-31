import Button from "./UI/Button";
import { clsx } from "clsx";
import { useReducer } from "react";
import { type UnknowObj } from "../types";
const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];

export default function Calculator() {
  function reduce(state: UnknowObj, action: UnknowObj) {
    switch (action.type) {
      case "add":
        return {
          ...state,
          currValue: action.number,
        };
    }
  }
  const [data, dispatch] = useReducer(reduce, { currValue: "0" });
  return (
    <>
      <main>
        <div className="input-section">
          <p>{data.currValue}</p>
        </div>
        <div className="numbers">
          {numbers.map((number, index) => {
            return (
              <Button
                onClick={(e) => {
                  dispatch({
                    type: "add",
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
