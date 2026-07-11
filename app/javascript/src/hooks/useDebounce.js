import { useEffect, useState } from "react";

const useDebounce = value => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceValue(value.trim());
    }, 350);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
