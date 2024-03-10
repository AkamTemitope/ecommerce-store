import { useRef } from "react";

const useRefs = () => {
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const setRef = (element: HTMLElement | null, key: string) => {
    refs.current[key] = element;
  };

  return { refs: refs.current, setRef };
};

export default useRefs;
