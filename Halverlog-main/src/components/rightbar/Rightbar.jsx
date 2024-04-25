import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import service from "../../appwrite/config";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Rightbar = ({ userData }) => {
  // console.log(userData);
  const users = useSelector((state) => state.user.users);
  const [temp, setTemp] = useState(
    userData?.friend.map((user) => user.friendId)
  );
  // console.log(temp);
  const [friend, setFriend] = useState(
    users.filter((user) => temp.includes(user.accountId))
  );
  // console.log(friend);
  const [pending, setPending] = useState(false);
  const [suggestion, setSuggestion] = useState();
  // console.log(suggestion);
  useEffect(() => {
    // if (userData != null) {
    //   setTemp(userData.friend.map((user) => user.friendId));
    // }
    if (users != null && temp != null) {
      setSuggestion(
        users.filter(
          (user) =>
            !temp.includes(user.accountId) &&
            user.accountId != userData.accountId
        )
      );
    }
    // getSuggestion();
  }, [temp, friend]);
  // const getSuggestion = async () => {
  //   const users = await service.getUsers({ accountId: userData.accountId });
  //   if (friend != null) {
  //     const sug = users.filter((user) => !friend.includes(user.$id));
  //     setSuggestion(sug);
  //   }
  // };
  // const handleFriend = (e, newUser) => {
  //   console.log(newUser.accountId);
  // };
  const handleFriend = async (e, newUser) => {
    console.log(newUser);
    setPending(true);
    const newFriend = [...temp];
    newFriend.push(newUser.accountId);
    setTemp(newFriend);
    const res = await service.addFriend({
      userId: userData.$id,
      friendId: newUser.accountId,
    });
    if (res) {
      window.location.reload();
      setPending(false);
    }
  };

  return (
    <div className="w-[25%] bg-[rgba(236,238,240,1)] max-[1000px]:hidden py-2 px-6">
      <div className="flex flex-col mt-4 bg-white rounded-3xl p-4 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)]">
        <div className="flex justify-between p-2">
          <span className="font-bold text-lg">Following</span>
          <span className="text sm active">
            <Link to="/friends">see all</Link>
          </span>
        </div>
        <div className="flex flex-col px-4 mt-2 gap-5 max-h-[20rem] overflow-y-auto">
          {/* friend list start*/}
          {friend.length > 0 ? (
            friend.map((user, index) => {
              return (
                <div key={index} className="flex gap-4">
                  <img
                    src={user.imageUrl}
                    alt="avatar"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-md">{user.name}</span>
                    <span className="text-xs">Following</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex">you didn't follow anyone yet</div>
          )}

          {/* friend list end */}
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-3xl p-4 mt-6 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)]">
        <div className="flex justify-between p-2">
          <span className="font-bold text-lg">Suggestions</span>
          <span className="text sm active">
            <Link to="/suggestion">see all</Link>
          </span>
        </div>
        <div className="flex flex-col px-4 mt-2 gap-6 max-h-[20rem] overflow-y-auto">
          {/* Suggestion list start*/}
          {suggestion
            ? suggestion.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={user ? user?.imageUrl : "/images/avatar.jpeg"}
                        alt="avatar"
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">
                          {user.name}
                        </span>
                        <span className="text-xs">Suggestions</span>
                      </div>
                    </div>
                    <button onClick={(e) => handleFriend(e, user)}>
                      {pending ? (
                        <BounceLoader color="#000000" size={25} />
                      ) : (
                        <IoAddCircle size={30} className="" />
                      )}
                    </button>
                  </div>
                );
              })
            : "No Suggestion found"}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
