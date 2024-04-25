import React, { useRef, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import service from "../../appwrite/config";
import { BeatLoader } from "react-spinners";

function CreatePost({ closeModal, userData }) {
  // useEffect(() => {
  //   document.body.style.overflowY = "hidden";
  //   return () => {
  //     document.body.style.overflowY = "scroll";
  //   };
  // }, []);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [imgUrl, setImgUrl] = useState("/icons/gallery-add.svg");
  const [img, setImg] = useState();
  const createPostImg = useRef(null);
  const handleClick = () => {
    createPostImg.current.click();
  };
  const handleChange = (event) => {
    const coverImg = event.target.files[0];
    setImg(coverImg);
    const reader = new FileReader();
    reader.onload = (e) => setImgUrl(e.target.result);
    reader.readAsDataURL(coverImg);
  };
  const [postStatusVal, setPostStatusVal] = useState("public");
  const getPostStatus = (e) => {
    setPostStatusVal(e.target.value);
  };

  const textArea = useRef(null);
  const getData = async () => {
    setloading(true);
    const data = {
      creator: userData.$id,
      caption: textArea.current.value,
      image: img,
      status: postStatusVal,
    };
    // console.log(data);
    const uploading = await service.createPost(data);
    if (!uploading) {
      setError(true);
    } else {
      setError(false);
      window.location.reload();
    }
    setInterval(() => {
      setError(null);
      // closeModal();
    }, 3000);
    setloading(false);
    // console.log(uploading);
  };
  return (
    <div className="fixed left-0 right-0 bottom-0 top-0 bg-[rgba(189,189,189,0.9)] min-w-max overflow-y-auto">
      {error == true && (
        <div className="relative w-44 text-center p-2 bg-red-500 text-white top-[13%] left-[5%]">
          some error occured
        </div>
      )}
      {error == false && (
        <div className="relative w-44 text-center p-2 bg-green-500 text-white top-[13%] left-[5%]">
          success
        </div>
      )}
      <div className="fixed min-w-[500px] max-w-lg min-h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-4 shadow-[5px_5px_27px_0px_rgba(0,0,0,0.31)] mt-8">
        <div className="flex justify-center my-1">
          <h2 className="text-black flex-1 text-center text-lg font-semibold">
            CreatePost
          </h2>
          <button className="" onClick={closeModal}>
            <CiCircleRemove size={25} className="active " />
          </button>
        </div>
        <hr className="w-full bg-gray-200 mb-3" />
        <div className="flex flex-col w-full p-3">
          <div className="flex w-full">
            <div className="rounded-full border-black border-[1px] flex w-12 h-12 bg-black">
              <img
                src={userData ? userData.imageUrl : "/images/avatar.jpeg"}
                alt="avatar"
                className="rounded-full w-12 h-12"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-black text-md ml-2">
                {userData ? userData.name : "user"}
              </span>
              <select
                id="post-status"
                className="text-sm w-20 bg-gray-300 mx-2"
                value={postStatusVal}
                onChange={getPostStatus}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <div id="caption" className="w-full py-2 text-gray-400">
            <textarea
              type="text"
              ref={textArea}
              className="bg-inherit w-full h-full outline-none text-black"
              placeholder={
                "What's on your mind " +
                (userData ? userData.name : "Bimal") +
                "?"
              }
            />
          </div>
          <button
            onClick={handleClick}
            className=" bg-[rgba(236,238,240,1)] w-full h-72 rounded-lg flex flex-col items-center justify-center shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)]"
          >
            <input
              type="file"
              ref={createPostImg}
              accept="image/jpg, image/png,image/jpeg"
              onChange={handleChange}
              className="hidden"
            />
            {imgUrl && imgUrl !== "/icons/gallery-add.svg" ? (
              <div className="flex w-full h-64">
                <img
                  src={imgUrl}
                  alt="logo"
                  className="object-contain w-full"
                />
              </div>
            ) : (
              <div className="text-center">
                <img src={imgUrl} alt="logo" className="w-20 h-20 mx-auto" />
                <h2 className="text-lg font-semibold">Add photos/videos</h2>
                <span className="text-sm">or drag and drop</span>
              </div>
            )}
          </button>
          <button
            onClick={getData}
            className={
              "w-full mt-4 h-10 items-center justify-center bg-[rgba(82,182,225,1)] py-3 rounded-lg text-sm shadow-[-3px_-2px_4px_0px_rgba(255,255,255,1),2px_4px_4px_0px_rgba(0,0,0,0.34)] hover:scale-105 duration-200 " +
              (loading ? "disable" : "")
            }
          >
            {loading ? <BeatLoader color="#FFFFFF" /> : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
