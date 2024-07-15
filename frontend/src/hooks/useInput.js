import { useEffect, useState } from "react";
import { preventInputs, replaceInputs } from "../utils/validator";

function useInput(defaultValue, inputRef) {
  const [inputValue, setInputValue] = useState("");
  const handleChangeInput = (e) => {
    if (!inputRef) {
      setInputValue(e.target.value);
      return;
    }

    const preventedValue = preventInputs(inputRef.current.name, e.target.value);
    const replacedValue = replaceInputs(inputRef.current.name, preventedValue);
    setInputValue(replacedValue);
  };

  useEffect(() => {
    if (!defaultValue) return;
    setInputValue(defaultValue);
  }, [defaultValue]);

  const resetInput = () => {
    setInputValue("");
  };
 
  return { inputValue, handleChangeInput, resetInput };
}

function useCheck(defaultValue) {
  const [isChecked, setIsChecked] = useState(defaultValue);
  const checkReverse = () => {
    setIsChecked(!isChecked);
  };
  const checkOn = () => {
    setIsChecked(true);
  };
  const checkOff = () => {
    setIsChecked(false);
  };

  return { isChecked, checkReverse, checkOn, checkOff };
}

export { useInput, useCheck };
