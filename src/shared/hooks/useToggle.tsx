import { useCallback, useState } from "react";

const useToggle = (
  initialState: boolean = false
): [state: boolean, setState: (bool?: boolean) => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(
    (bool?: boolean) => {
      setState((state) => {
        return bool ?? !state;
      });
    },
    [state]
  );

  return [state, toggle];
};

export default useToggle;
