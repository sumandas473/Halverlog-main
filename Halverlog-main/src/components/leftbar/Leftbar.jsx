import React from "react";
import { MdFeed } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiVideoFill } from "react-icons/pi";
import Style from "./leftbar.module.css";
import "./leftbar.css";
import service from "../../appwrite/config";
import { Link, useLocation } from "react-router-dom";

const Leftbar = ({ userData, clicked }) => {
  const location = useLocation();
  // console.log(location);
  // console.log(userData.friend.length);
  return (
    <div
      className={`flex flex-col bg-[rgba(236,238,240,1)] w-[25%] max-[1000px]:w-[35%] min-w-72 px-6 py-2 ${clicked}`}
    >
      <div
        className={
          "relative flex-col mt-4 bg-[rgba(217,222,226,1)] rounded-3xl p-4 min-h-[27rem] shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)] " +
          (location.pathname == "/" ? "hidden" : "flex")
        }
      >
        <div className="flex p-1 w-full h-32 bg-[rgba(217,217,217,1)] rounded-2xl shadow-[0px_4px_4px_0px_rgba(143,125,125,0.42)_inset,0px_4px_4px_0px_rgba(255,255,255,0.25)]">
          <img
            src={
              userData?.coverImageId
                ? service.getFilePreview(userData.coverImageId)
                : "/img/nature.jpg"
            }
            alt="bg-image"
            className="rounded-2xl w-full object-cover"
          />
        </div>
        <div className="flex rounded-full absolute top-[23%] left-[35%] bg-black">
          <img
            src={userData?.imageUrl || "/images/avatar.jpeg"}
            alt="avatar"
            className="h-20 w-20 rounded-full"
          />
        </div>
        <div className="flex flex-col justify-evenly gap-6 mt-14">
          <div className="flex flex-col justify-center items-center">
            <span className="text-sm font-semibold">
              {userData?.name || "name"}
            </span>
            <span className="text-xs">@{userData?.username || "username"}</span>
          </div>
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <button className="profilebutton active">Post</button>
              <span className="mt-2">
                {userData ? userData.post.length : 0}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <button className="profilebutton active">Followers</button>
              <span className="mt-2">0</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="profilebutton active">Following</button>
              <span className="mt-2">
                {userData ? userData.friend.length : 0}
              </span>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button className="w-1/2 items-center justify-center bg-[rgba(82,182,225,1)] py-3 rounded-3xl text-xs shadow-[-3px_-2px_4px_0px_rgba(255,255,255,1),2px_4px_4px_0px_rgba(0,0,0,0.34)] hover:scale-110">
              MY PROFILE
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-[rgba(236,238,240,1)] rounded-3xl p-6 mt-6 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)] items-start">
        <div className="font-semibold ml-3 mt-2 self-start text-lg">
          Shortcuts
        </div>
        <div className="flex flex-col p-4 ml-3 ">
          <button className="sbutton">
            <MdFeed size={25} className="active" />
            <span className="text-lg ml-2 active">Feeds</span>
          </button>
          <button className="sbutton">
            <FaUsers size={25} className="active" />
            <span className="text-lg ml-2 active">
              <Link to="/suggestion">Suggestion</Link>
            </span>
          </button>
          <button className="sbutton">
            <PiVideoFill size={25} className="active" />
            <span className="text-lg ml-2 active">Video</span>
          </button>
          <button className="sbutton">
            <FaBookmark size={20} className="active" />
            <span className="text-lg ml-2 active">Saved</span>
          </button>
        </div>
      </div>
      <div
        className={
          "flex-col bg-[rgba(236,238,240,1)] rounded-3xl p-4 mt-6 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)] items-start " +
          (location.pathname == "/" ? "flex" : "hidden")
        }
      >
        <div className="font-semibold ml-2 mt-1 self-start text-lg">
          Ad Section
        </div>
        <div className="flex p-1 w-full h-44 bg-[rgba(217,217,217,1)] rounded-2xl shadow-[0px_4px_4px_0px_rgba(143,125,125,0.42)_inset,0px_4px_4px_0px_rgba(255,255,255,0.25)]">
          <img
            src={
              userData?.coverImageId
                ? service.getFilePreview(userData.coverImageId)
                : "/img/nature.jpg"
            }
            alt="bg-image"
            className="rounded-2xl w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
