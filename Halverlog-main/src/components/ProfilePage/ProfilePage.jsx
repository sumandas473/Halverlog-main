import React, { useEffect, useRef, useState } from "react";
import Style from "./ProfilePage.module.css";
import { FaCamera } from "react-icons/fa";
import { FaFaceLaugh } from "react-icons/fa6";
import Rightbar from "../rightbar/Rightbar";
import Bottombar from "../bottombar/Bottombar";
import Leftbar from "../leftbar/Leftbar";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "../createpost/CreatePost";
import PostForm from "../postform/PostForm";
import service from "../../appwrite/config";
import { BeatLoader, BounceLoader, FadeLoader } from "react-spinners";

const ProfilePage = () => {
  const inputRef = useRef();
  const coverRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState("hide");
  const [loader, setloader] = useState(false);
  const [ploader, setPloader] = useState(false);
  const [cloader, setCloader] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  // const [posts, setPosts] = useState([]);
  const Allposts = useSelector((state) => state.post.posts);
  const posts = Allposts.filter(
    (post) => post.creator.accountId == userData.accountId
  );

  const closeModal = () => {
    return setShowModal(false);
  };
  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
    // fetch();
  }, [authStatus, navigate]);

  const handleInputClick = () => {
    inputRef.current.click();
  };

  const handleProfileImage = async (e) => {
    setPloader(true);
    const profileImg = e.target.files[0];
    // console.log(userData);
    if (userData.imageId != null) {
      const previmgId = userData.imageId;
      const updated = await service.updateProfileImg({
        profileImg: profileImg,
        previmgId: previmgId,
        documentId: userData.$id,
      });
      if (updated) {
        console.log("success");
        window.location.reload(false);
      }
    } else {
      const updated = await service.addProfileImg({
        profileImg: profileImg,
        documentId: userData.$id,
      });
      if (updated) {
        console.log("success");
        window.location.reload(false);
      }
    }
  };

  const handleCoverClick = () => {
    coverRef.current.click();
  };

  const handleCoverImage = async (e) => {
    setCloader(true);
    const coverImg = e.target.files[0];
    // console.log(userData);
    if (userData.coverImageId != null) {
      const previmgId = userData.coverImageId;
      const updated = await service.updateCoverImg({
        coverImg: coverImg,
        previmgId: previmgId,
        documentId: userData.$id,
      });
      if (updated) {
        console.log("success");
        window.location.reload();
      }
    } else {
      const updated = await service.addCoverImg({
        coverImg: coverImg,
        documentId: userData.$id,
      });
      if (updated) {
        console.log("success");
        window.location.reload();
      }
    }
  };

  // async function fetch() {
  //   setloader(true);
  //   let response = await service.fetchProfilePost(userData.$id);
  //   setPosts(response);
  //   // console.log(response);
  //   setloader(false);
  // }
  return (
    <div className="w-full bg-[rgba(236,238,240,1)] min-w-[470px]">
      {/* navbar starts*/}
      <Navbar userData={userData} clicked={clicked} setClicked={setClicked} />
      {/* navbar ends */}
      <div className="flex w-full relative h-full mt-[5rem]">
        {/* Leftbar start */}
        <Leftbar userData={userData} clicked={clicked} />
        {/* middle content start*/}
        <div
          className={`hide-scroll p-2 bg-[rgba(236,238,240,1)] w-[50%] max-[1000px]:w-[65%] flex flex-col z-[1] ${Style.add} h-[53rem] overflow-y-auto`}
        >
          {/* profile image with name starts */}
          <div className="flex flex-col w-full mt-4 p-4 gap-6 bg-[rgba(236,238,240,1)] rounded-3xl shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)]">
            <div className="flex relative p-1 w-full h-72 bg-[rgba(217,217,217,1)] rounded-2xl shadow-[0px_4px_4px_0px_rgba(143,125,125,0.42)_inset,0px_4px_4px_0px_rgba(255,255,255,0.25)]">
              {cloader ? (
                <div className="w-full h-full flex items-center justify-center">
                  <BeatLoader color="#36d7b7" size={30} />
                </div>
              ) : (
                <img
                  src={
                    userData.coverImageId
                      ? service.getFilePreview(userData?.coverImageId)
                      : "/img/nature.jpg"
                  }
                  alt="bg-image"
                  className="rounded-2xl h-full w-full object-cover"
                />
              )}
              <button
                onClick={handleCoverClick}
                className="absolute flex items-center right-2 py-2 px-4 top-[80%] focus:outline-none bg-[rgba(129,129,129,0.5)] hover:bg-blue-700 text-white font-semibold rounded-xl"
              >
                <input
                  type="file"
                  accept=".jpeg,.jpg,.png"
                  ref={coverRef}
                  onChange={handleCoverImage}
                  className="w-1 h-1 outline-none bg-inherit rounded-full absolute"
                />
                <FaCamera className="mr-1" />
                Edit cover image
              </button>
              <div className="absolute top-[50%] left-4 bg-black rounded-full">
                {ploader ? (
                  <div className="h-40 w-40 rounded-full flex items-center justify-center">
                    <BounceLoader color="#36d7b7" size={80} />
                  </div>
                ) : (
                  <img
                    src={userData?.imageUrl || "/images/avatar.jpeg"}
                    alt="avatar"
                    className="h-40 w-40 rounded-full"
                  />
                )}
                <button
                  onClick={handleInputClick}
                  className="absolute right-2 bottom-2 bg-gray-500 rounded-full p-2 text-white hover:bg-blue-700"
                >
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png,.svg"
                    ref={inputRef}
                    onChange={handleProfileImage}
                    className="w-0 h-0 outline-none bg-inherit rounded-full absolute"
                  />
                  <FaCamera size={20} />
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="ml-8 text-2xl font-semibold">
                {userData?.name}
              </div>
              <div className="flex flex-1 justify-evenly flex-wrap">
                <button className="mx-2 active text-md">Timeline</button>
                <button className="active text-md">About</button>
                <button className="mx-2 active text-md">Friends</button>
                <button className="active text-md">Photos</button>
              </div>
            </div>
          </div>
          {/* profile image with name ends */}
          {/* create post */}
          <div className="flex flex-col w-full mt-4 p-10 gap-6 bg-[rgba(236,238,240,1)] rounded-3xl shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)]">
            <div className="flex mx-2 justify-center gap-4">
              <div className="rounded-full flex w-12 h-12">
                <img
                  src={userData?.imageUrl || "/images/avatar.jpeg"}
                  alt="avatar"
                  className="rounded-full w-12 h-12"
                />
              </div>
              <div className="flex w-4/5 rounded-3xl justify-center items-center text-black bg-[rgba(217,217,217,1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)_inset]">
                <input
                  type="text"
                  placeholder="share something..."
                  className="w-[85%] outline-none bg-inherit text-black active"
                  onClick={() => setShowModal(true)}
                />
                <FaFaceLaugh className="active hover:scale-110" />
              </div>
            </div>
            <div className="flex justify-around flex-wrap">
              <button
                className="postbutton mt-1"
                onClick={() => setShowModal(true)}
              >
                <span className="w-10">
                  <img src="/images/img1.png" alt="add-image" />
                </span>
                <span className="w-full text-sm active">image</span>
              </button>
              <button
                className="postbutton mt-1"
                onClick={() => setShowModal(true)}
              >
                <span className="w-10">
                  <img src="/images/img2.png" alt="add-video" />
                </span>
                <span className="w-full text-sm active">video</span>
              </button>
              <button className="postbutton mt-1">
                <span className="w-10">
                  <img src="/images/img3.png" alt="add-news" />
                </span>
                <span className="w-full text-sm active">news</span>
              </button>
              <button
                className="postbutton mt-1"
                onClick={() => setShowModal(true)}
              >
                <span className="w-16 text-sm active">post</span>
              </button>
            </div>
          </div>
          {showModal && (
            <CreatePost userData={userData} closeModal={closeModal} />
          )}
          {/* post template */}
          {loader ? (
            <div className="flex justify-center items-center h-40">
              <FadeLoader color="#0000ff" />
            </div>
          ) : (
            posts.map((post) => <PostForm key={post.caption} post={post} />)
          )}
        </div>
        {/* Rightbar starts */}
        <Rightbar userData={userData} />
      </div>
      {/* bottom bar */}
      <Bottombar userData={userData} />
    </div>
  );
};

export default ProfilePage;
