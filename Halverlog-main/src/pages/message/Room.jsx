import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import service from "../../appwrite/config";
import conf from "../../conf/conf";
import client from "../../conf/realtimeConf";
import { BounceLoader } from "react-spinners";

const Room = () => {
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const users = useSelector((state) => state.user.users);
  const [user, setUser] = useState(
    users.filter((data) => data.accountId == id)
  );
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/message");
  };
  const identification1 = userData.accountId + user[0].accountId;
  const identification2 = user[0].accountId + userData.accountId;
  useEffect(() => {
    gettingMessage();
    const unsubscribe = client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteMessageCollectionId}.documents`,
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        // console.log("REAL TIME:", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log(" a message created");
          gettingMessage();
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log(" a message deleted");
          gettingMessage();
        }
      }
    );
    console.log("unsubscribe : ", unsubscribe);
    return () => {
      unsubscribe();
    };
  }, []);
  //   console.log(user);
  //   console.log(identification);
  // console.log(userData.imageUrl);
  const handleSubmit = async () => {
    if (messageBody != "") {
      const payload = {
        body: messageBody,
        user_id: userData.$id,
        username: userData.name,
        user_receiver_id: identification1,
        imageUrl: userData.imageUrl,
      };
      setLoading(true);
      setMessageBody("");
      const resp = await service.addMessage(payload);
      if (resp) {
        setLoading(false);
        //   gettingMessage();
      }
    }
  };
  const gettingMessage = async () => {
    setIsFetching(true);
    const resp = await service.getMessage(identification1, identification2);
    // console.log(resp.documents);
    setIsFetching(false);
    setMessages(resp.documents);
  };
  return (
    <>
      <div className="w-full h-16 bg-[rgba(236,238,240,1)] rounded-lg p-4 mt-6 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)] justify-start items-center flex gap-4">
        <div onClick={handleBack} className="cursor-pointer">
          <IoMdArrowRoundBack size={25} />
        </div>
        <div className="rounded-full flow-root w-10 h-10 bg-black">
          <img
            src={user[0] ? user[0]?.imageUrl : "/images/avatar.jpeg"}
            alt="avatar"
            className="rounded-full w-10 h-10"
          />
        </div>
        <div className="font-semibold ml-2 mt-1 text-lg">{user[0].name}</div>
      </div>
      <div className="w-full h-[100vh] bg-[rgba(236,238,240,1)] rounded-lg p-4 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)] justify-center flex-col">
        <div className=" flex justify-center gap-2 ">
          <div className="flex w-4/5 h-12 rounded-3xl justify-center items-center text-black bg-[rgba(217,217,217,1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]">
            <input
              type="text"
              placeholder="share something..."
              className="w-[85%] outline-none bg-inherit text-black"
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}
            />
          </div>
          <button
            className={
              "flex rounded-full h-12 w-12 bg-blue-600 justify-center items-center cursor-pointer "
            }
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <BounceLoader color="#94c6f0" size={25} />
            ) : (
              <IoSend size={25} />
            )}
          </button>
        </div>
        <div className="flex-col mt-2 overflow-y-auto p-4 px-[6%] flex-1">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.$id}
                className={
                  "flex flex-col " +
                  (message.user_id == userData.$id
                    ? "items-start"
                    : "items-end")
                }
              >
                <div className="px-12">
                  <span className="text-xs text-red-500">
                    ~{message.username}
                  </span>
                  <span className="text-xs ml-4 text-red-500">
                    {new Date(message.$createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  {message.user_id == userData.$id ? (
                    <>
                      <div className="rounded-full flow-root w-10 h-10 bg-black">
                        <img
                          src={
                            message.imageUrl
                              ? message.imageUrl
                              : "/images/avatar.jpeg"
                          }
                          alt="avatar"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      <div
                        className={
                          "w-fit p-2 text-white text-md rounded-lg " +
                          (message.user_id == userData.$id
                            ? "bg-green-500"
                            : "bg-gray-500")
                        }
                      >
                        <span>{message.body}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={
                          "w-fit p-2 text-white text-md rounded-lg " +
                          (message.user_id == userData.$id
                            ? "bg-green-500"
                            : "bg-gray-500")
                        }
                      >
                        <span>{message.body}</span>
                      </div>
                      <div className="rounded-full flow-root w-10 h-10 bg-black">
                        <img
                          src={
                            message.imageUrl
                              ? message.imageUrl
                              : "/images/avatar.jpeg"
                          }
                          alt="avatar"
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <span>{isFetching ? "Fetching data...." : "No Messages yet"}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Room;
