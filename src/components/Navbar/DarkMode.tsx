import React, { useEffect, useState } from "react";
import Image from "next/image";
import LightButton from "../../../public/assets/website/light-mode-button.png";
import DarkButton from "../../../public/assets/website/dark-mode-button.png";

const DarkMode = () => {
  // State to manage the theme
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light"
  );

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Apply the theme to the document and save it in localStorage
  useEffect(() => {
    if (!theme) return;

    const element = document.documentElement;
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="relative">
      {/* Light Mode Button */}
      <Image
        onClick={toggleTheme}
        src={LightButton}
        alt="Light mode"
        width={48}
        height={48}
        className={`w-12 cursor-pointer absolute right-0 z-10 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        } transition-all duration-300`}
      />
      {/* Dark Mode Button */}
      <Image
        onClick={toggleTheme}
        src={DarkButton}
        alt="Dark mode"
        width={48}
        height={48}
        className={`w-12 cursor-pointer absolute right-0 z-10 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        } transition-all duration-300`}
      />
    </div>
  );
};

export default DarkMode;
