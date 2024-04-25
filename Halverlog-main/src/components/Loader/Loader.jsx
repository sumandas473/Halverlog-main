import React from "react";
import Style from "./Loader.module.css";

function Loader() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <div className={`fixed top-[34%] left-[40%] ${Style.loader}`}></div>
      <div className="flex relative text-2xl top-[68%] left-[38%] text-blue-500 font-semibold">
        Welcome to Halverlog
        {/* <img src="images/Halverlog1.png" alt="logo" className="w-28" /> */}
      </div>
    </div>
  );
}

export default Loader;
