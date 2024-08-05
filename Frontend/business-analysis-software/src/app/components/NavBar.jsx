"use client";
import Image from "next/image";
import { IoMdArrowDropdown, IoIosExit } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "../ThemeContext";
import Link from "next/link";
import { useState } from "react";

export default function NavBar({ styles }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState({
    menu: false,
    software: false,
  });

  const toggleDropdown = (property) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
  };

  return (
    <>
      <div className={`flex justify-center items-center py-6 ${styles}`}>
        <nav
          className={`${
            theme == "light" ? "bg-white dark" : "bg-dark text-white"
          }  flex px-8 py-3 w-[90%] rounded-[25px] justify-between`}
        >
          <div>
            <Link href="/">
              {theme == "light" ? (
                <Image
                  src="/general/Wuau_Logo-color.png"
                  width={140}
                  height={35.16}
                  priority={true}
                  alt="logo"
                />
              ) : (
                <Image
                  src="/general/Wuau_Logo-white.png"
                  width={140}
                  height={35.16}
                  priority={true}
                  alt="logo"
                />
              )}
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Menu
              theme={theme}
              toggleTheme={toggleTheme}
              toggleDropdown={toggleDropdown}
              showDropdown={showDropdown}
              pathname={pathname}
            />
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => toggleDropdown("menu")}>
              <IoMenu className="text-2xl" />
            </button>
            {showDropdown.menu && (
              <div
                className={`w-[220px] absolute flex flex-col items-center right-0 top-0 gap-4 h-screen ${
                  theme == "light"
                    ? "bg-white border border-[#36323E]"
                    : "bg-dark border border-white"
                } px-8 pt-8 shadow-md`}
              >
                <Menu
                  theme={theme}
                  toggleTheme={toggleTheme}
                  toggleDropdown={toggleDropdown}
                  showDropdown={showDropdown}
                  pathname={pathname}
                />
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

function Menu({ toggleTheme, theme, toggleDropdown, showDropdown, pathname }) {
  return (
    <>
      <div className="absolute red top-1 right-3 flex md:hidden">
        <button onClick={() => toggleDropdown("menu")}>
          <IoIosExit className="text-3xl" />
        </button>
      </div>
      <Link className={pathname === "/" ? "font-bold" : ""} href="/">
        Home
      </Link>
      <button
        onClick={() => toggleDropdown("software")}
        className="flex items-center"
      >
        Softwares
        {showDropdown && showDropdown.software ? (
          <IoMdArrowDropdown className="text-2xl" />
        ) : (
          <IoMdArrowDropdown className="text-2xl transform rotate-180" />
        )}
      </button>
      {showDropdown && showDropdown.software && (
        <>
          <div
            className={`md:absolute flex flex-col md:top-20 gap-4 ${
              theme == "light"
                ? "bg-white md:border md:border-[#36323E]"
                : "bg-dark md:border md:border-white"
            } md:rounded-[25px] md:p-4 md:shadow-md`}
          >
            <Link
              className={pathname === "/business-analysis" ? "font-bold" : ""}
              href="/business-analysis"
            >
              Business Analysis
            </Link>
          </div>
        </>
      )}
      <Link
        className={pathname === "/sign-in" ? "font-bold" : ""}
        href="/sign-in"
      >
        Sign-in
      </Link>
      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <BsFillMoonStarsFill />
        ) : (
          <LuSun className="yellow text-2xl" />
        )}
      </button>
      <Link
        className={pathname === "/sign-up" ? "font-bold" : ""}
        href="/sign-up"
      >
        <button className="bg-yellow px-2 py-1 rounded-[25px] dark font-semibold">
          Sign-up
        </button>
      </Link>
    </>
  );
}
