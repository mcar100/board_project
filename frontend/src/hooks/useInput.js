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

function useCheckbox(defaultValue) {
  const [isChecked, setIsChecked] = useState(defaultValue);
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  return { isChecked, handleCheckBox };
}

export { useInput, useCheckbox };
