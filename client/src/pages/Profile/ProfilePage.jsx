import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export default function ProfilePage() {
  const { userDetails } = useUserContext();
  const styles = `relative flex justify-between items-center max-w-[90%] px-[10px] py-[2px] font-semibold tracking-wide rounded-md hover:cursor-default duration-300 transition-all hover:bg-[#bbbbbb] text-[#363636] text-[18px]`;
  const activeStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "4px 0 4px 0",
    fontSize: "20px",
  };

  return (
    <div className="min-h-[800px] grid grid-cols-[0.5fr_2fr] gap-10">
      <div className="border-r border-black">
        <ul className="flex flex-col gap-[6px]">
          <NavLink to="/profile" end style={({ isActive }) => (isActive ? activeStyles : null)} className={styles}>
            My Profile
          </NavLink>
          {userDetails.isAdmin === 1 && (
            <NavLink to="stock" style={({ isActive }) => (isActive ? activeStyles : null)} className={styles}>
              Stock
            </NavLink>
          )}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
