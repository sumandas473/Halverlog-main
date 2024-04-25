import React, { useEffect, useState } from "react";
import Bottombar from "../../components/bottombar/Bottombar";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rightbar from "../../components/rightbar/Rightbar";
import Style from "../../components/ProfilePage/ProfilePage.module.css";
import { FaFaceLaugh } from "react-icons/fa6";
import CreatePost from "../../components/createpost/CreatePost";
import PostForm from "../../components/postform/PostForm";
import { FadeLoader } from "react-spinners";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState("hide");
  const closeModal = () => {
    return setShowModal(false);
  };
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const Allposts = useSelector((state) => state.post.posts);
  const posts = Allposts.filter((post) => post.status == "public");
  // console.log(posts);
  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
    // fetch();
  }, [authStatus, navigate]);

  // async function fetch() {
  //   // setloader(true);
  //   let response = await service.fetchPublicPost();
  //   setPosts(response);
  //   // console.log(response);
  //   // setloader(false);
  // }

  return (
    <div className="w-full bg-[rgba(236,238,240,1)] min-w-[470px] min-h-[100lvh]">
      <Navbar userData={userData} clicked={clicked} setClicked={setClicked} />
      <div className="flex w-full relative h-full mt-[5rem]">
        <Leftbar userData={userData} clicked={clicked} />
        <div
          className={`hide-scroll overflow-y-auto p-2 bg-[rgba(236,238,240,1)] h-[55rem] w-[50%] max-[900px]:w-[65%] flex flex-col z-[1] ${Style.add}`}
        >
          <div className="w-full h-16 sticky top-[-0.3rem] mt-4 bg-[rgba(236,238,240,1)] rounded-lg p-4 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)] justify-center flex">
            <div className="font-semibold ml-2 mt-1 text-lg">Home Feed</div>
          </div>
          <div className="flex flex-col w-full mt-4 p-10 gap-6 bg-[rgba(236,238,240,1)] rounded-3xl shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)]">
            <div className="flex mx-2 justify-center gap-4">
              <div className="rounded-full flow-root w-12 h-12 bg-black">
                <img
                  src={userData ? userData.imageUrl : "/images/avatar.jpeg"}
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
          <div className="">
            {!posts ? (
              <div className="flex justify-center items-center h-40">
                <FadeLoader color="#0000ff" />
                <p className="text-lg ml-4 text-blue-500">Loading...</p>
              </div>
            ) : (
              posts.map((post) => <PostForm key={post.caption} post={post} />)
            )}
          </div>
        </div>
        <Rightbar userData={userData} />
      </div>
      <Bottombar userData={userData} />
    </div>
  );
};

export default Home;
