import React, { useContext } from "react";
import LayoutMenus from "../Utilities/LayoutMenus";
import TasksDone from "./TasksDone";
import { MenusContext } from "../../Context/Menus/MenusContext";
import { useUserAuth } from "../../Context/Authentication/AuthContext";

const AccountData = () => {
  const { state, dispatch } = useContext(MenusContext);
  const { user, handleLogout } = useUserAuth();

  const closeMenuHandler = () => {
    dispatch({ type: "CLOSE_MENU_ACCOUNT" });
  };

  return (
    <LayoutMenus
      menuOpen={state.menuAccountOpened}
      closeMenuHandler={closeMenuHandler}
      className="top-0 right-0 "
    >
      <section className="flex flex-col h-full p-5">
        <div className="flex-grow">
          <span className="flex items-center mx-auto mb-4">
            <span className="font-medium">Hi, {`${user?.name ? user?.name : "User!"}`}</span>
            {/* <img
              src={`${user?.photoURL ? user?.photoURL : avatar1}`}
              alt="User"
              className="w-10 ml-4 rounded-full"
            /> */}
          </span>

          {/* <DarkMode /> */}
          <TasksDone />
          {/* <DeleteTasks /> */}
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto bg-[#335c91] p-2 rounded-md text-center transition hover:bg-[#335c91] text-slate-100"
        >
          Log Out
        </button>
        {/* <a
          href="https://github.com/rohit4242"
          className="mt-4 bg-[#335c91] p-2 rounded-md text-center transition hover:bg-[#335c91] text-slate-200"
        >
          Made by Team 7
        </a> */}
      </section>
    </LayoutMenus>
  );
};

export default AccountData;
