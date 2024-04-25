import React from "react";

const Suggest = ({ user, handleFriend }) => {
  return (
    <div
      className={
        "flex relative flex-col mt-2 w-[13rem] bg-[rgba(217,222,226,1)] rounded-3xl p-2 h-[18rem] shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)]"
      }
    >
      <div className="flex p-1 w-full h-32 bg-[rgba(217,217,217,1)] rounded-2xl shadow-[0px_4px_4px_0px_rgba(143,125,125,0.42)_inset,0px_4px_4px_0px_rgba(255,255,255,0.25)]">
        <img
          src={
            user?.coverImageId
              ? service.getFilePreview(user.coverImageId)
              : "/img/nature.jpg"
          }
          alt="bg-image"
          className="rounded-2xl w-full object-cover"
        />
      </div>
      <div className="flex rounded-full absolute top-[25%] left-[32%] bg-black">
        <img
          src={user?.imageUrl || "/images/avatar.jpeg"}
          alt="avatar"
          className="h-20 w-20 rounded-full"
        />
      </div>
      <div className="flex flex-col justify-evenly gap-6 mt-6">
        <div className="flex flex-col justify-center items-center">
          <span className="text-sm font-semibold">{user?.name || "name"}</span>
          <span className="text-xs">@{user?.username || "username"}</span>
        </div>
        <div className="flex w-full justify-center">
          <button
            className="w-[80%] items-center justify-center bg-[rgba(82,182,225,1)] py-3 rounded-3xl text-xs shadow-[-3px_-2px_4px_0px_rgba(255,255,255,1),2px_4px_4px_0px_rgba(0,0,0,0.34)] hover:scale-110"
            onClick={(e) => handleFriend(e, user)}
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suggest;
