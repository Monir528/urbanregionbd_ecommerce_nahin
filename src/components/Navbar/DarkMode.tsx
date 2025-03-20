import React from "react";
import Image from 'next/image';
import LightButton from "../../../public/assets/website/light-mode-button.png";
import DarkButton from "../../../public/assets/website/dark-mode-button.png";

const DarkMode = () => {
  // const [theme, setTheme] = React.useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  // );

  const element = document.documentElement; // access to html element

  // set theme to localStorage and html element
  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      element.classList.add("dark");
      element.classList.add("dark");
    } else {
      element.classList.remove("light");
      element.classList.remove("dark");
    }
  });

  return (
    <div className="relative">
      <Image
          onClick={toggleTheme}
          src={LightButton}
          alt="Light mode"
          width={48}
          height={48}
          className={`w-12 cursor-pointer absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"} transition-all duration-300`}
      />
      <Image
          onClick={toggleTheme}
          src={DarkButton}
          alt="Dark mode"
          width={48}
          height={48}
          className="w-12 cursor-pointer"
      />
    </div>
  );
};

export default DarkMode;
