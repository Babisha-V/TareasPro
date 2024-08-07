import React, { useContext } from "react";
import { MenusContext } from "../../Context/Menus/MenusContext";
import BtnAddTask from "../Utilities/BtnAddTask";
import Directories from "./Directories/Directories";
import NavLinks from "./NavLinks";
import LayoutMenus from "../Utilities/LayoutMenus";
import logo from "../../assets/logo.png"; // Import your logo image

const classLinkActive =
  "text-[#335c91] bg-[#a9caf5] border-r-4 border-[#335c91] dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const Menu = () => {
  const { state, dispatch } = useContext(MenusContext);

  const closeMenuHandler = () => {
    dispatch({ type: "CLOSE_MENU_HEADER" });
  };

  return (
    <LayoutMenus
      menuOpen={state.menuHeaderOpened}
      closeMenuHandler={closeMenuHandler}
      className="left-0"
    >
      <header className="flex flex-col h-full p-4">
        {/* Logo Section */}
        <div className="flex items-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 mr-4" // Increase size and adjust margin
          />
          <h1 className="text-lg font-bold tracking-wide uppercase xl:block">
            Easy Track
          </h1>
        </div>
        <BtnAddTask className="mx-4 my-8" />
        <NavLinks classActive={classLinkActive} />
        <Directories classActive={classLinkActive} />
      </header>
    </LayoutMenus>
  );
};

export default Menu;
