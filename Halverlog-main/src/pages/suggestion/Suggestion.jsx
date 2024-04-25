import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Suggest from "../../components/suggest/Suggest";
import service from "../../appwrite/config";

const Suggestion = () => {
  const userData = useSelector((state) => state.auth.userData);
  const users = useSelector((state) => state.user.users);
  const [suggestion, setSuggestion] = useState([]);
  const [temp, setTemp] = useState(
    userData?.friend.map((user) => user.friendId)
  );
  const [friend, setFriend] = useState(
    users.filter((user) => temp.includes(user.accountId))
  );
  useEffect(() => {
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
  const handleFriend = async (e, newUser) => {
    // console.log(newUser);
    const newFriend = [...temp];
    newFriend.push(newUser.accountId);
    setTemp(newFriend);
    const res = await service.addFriend({
      userId: userData.$id,
      friendId: newUser.accountId,
    });
    if (res) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className="w-full h-16 bg-[rgba(236,238,240,1)] rounded-lg p-4 mt-6 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)] justify-center flex">
        <div className="font-semibold ml-2 mt-1 text-lg">Suggestions</div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {suggestion.length > 0
          ? suggestion.map((user) => (
              <Suggest user={user} handleFriend={handleFriend} key={user.$id} />
            ))
          : "No Suggestions Yet"}
      </div>
    </>
  );
};

export default Suggestion;
