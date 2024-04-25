import React, { useState } from "react";
import { useSelector } from "react-redux";
import Temp from "./Temp";

const Message = () => {
  const userData = useSelector((state) => state.auth.userData);
  const users = useSelector((state) => state.user.users);
  const [temp1, setTemp1] = useState(
    userData.friend.map((user) => {
      return user.friendId;
    })
  );
  // console.log(userData);
  const [temp, setTemp] = useState(
    users.filter((user) => temp1.includes(user.accountId))
  );
  return (
    <>
      <div className="w-full h-16 bg-[rgba(236,238,240,1)] rounded-lg p-4 mt-6 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)] justify-center flex">
        <div className="font-semibold ml-2 mt-1 text-lg">Messages</div>
      </div>
      <div className="flex flex-col gap-2 flex-wrap">
        {temp
          ? temp.map((user) => <Temp user={user} key={user.$id} />)
          : "Empty Message Page"}
      </div>
    </>
  );
};

export default Message;
