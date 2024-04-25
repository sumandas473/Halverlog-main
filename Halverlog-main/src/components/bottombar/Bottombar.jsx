import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaUsers } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";

const Bottombar = ({ userData }) => {
  const location = useLocation();
  return (
    <div className="fixed bottom-0 h-14 bg-[rgba(231,231,231,1)] w-full lg:hidden z-10">
      <div className="flex gap-2 items-center justify-around h-full">
        <Link to="/" className="bottombtn">
          <MdHome
            size={25}
            color="grey"
            className={location.pathname == "/" ? "activate" : "active"}
          />
        </Link>
        <Link to="/message" className="bottombtn">
          <BsChatDotsFill
            size={25}
            color="grey"
            className={
              location.pathname == ("/message" || "/message/:id")
                ? "activate"
                : "active"
            }
          />
        </Link>
        <Link to="/notification" className="bottombtn">
          <FaBell
            size={25}
            color="grey"
            className={
              location.pathname == "/notification" ? "activate" : "active"
            }
          />
        </Link>
        <Link to="/friends" className="bottombtn">
          <FaUsers
            size={25}
            color="grey"
            className={location.pathname == "/friends" ? "activate" : "active"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Bottombar;
