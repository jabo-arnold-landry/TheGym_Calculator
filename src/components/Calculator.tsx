import Button from "./UI/Button";
import { useReducer } from "react";
import { keyPad } from "../utils/data";
import { handleClick, handleReducerActions } from "../utils/functionHandlersUtils";


export default function Calculator() {

  const [{ operand, currValue }, dispatch] = useReducer(handleReducerActions, {
    currValue: null,
    operation: null,
    operand: null,
  });


  return (
    <>
      <main>
        <div className="numbers">
          <div className="output">
            <div>{currValue}</div>
            <div className="currvalue-operand">{operand}</div>
          </div>

          {keyPad.map((pad, index) => {
            const { clsname, key } = pad;
            return (
              <Button
                onClick={(e)=>{
                  handleClick(e, dispatch)
                }}
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
