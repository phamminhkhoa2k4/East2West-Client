import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const className = "dark";
    const classNameNormal = "normal";
    const htmlClass = window.document.documentElement.classList;
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? htmlClass.add(className)
      : htmlClass.remove(className);

     if (colorMode === "normal") {
       htmlClass.add(classNameNormal);
       bodyClass.add(classNameNormal);
     } else {
       htmlClass.remove(classNameNormal);
       bodyClass.remove(classNameNormal);
     }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
