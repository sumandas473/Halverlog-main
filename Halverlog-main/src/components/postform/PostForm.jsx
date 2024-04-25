import React, { useState } from "react";
import { FaHeart, FaShare } from "react-icons/fa";
import { BsFillChatTextFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import { MdLock } from "react-icons/md";
import service from "../../appwrite/config";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const likesList = post?.likes.map((user) => user.$id);
  const userData = useSelector((state) => state.auth.userData);
  const [likes, setLikes] = useState(likesList);
  // console.log(likes);
  const checkisLiked = (likes) => {
    if (likes.includes(userData.$id)) {
      return true;
    }
  };
  const location = useLocation();
  // console.log(post);
  const handleDelete = async (post) => {
    alert("are you sure want to delete this post");
    const response = await service.deletePost(post);
    if (response) {
      window.location.reload();
    }
  };
  const handleLike = async (postId) => {
    let newLikes = [...likes];
    if (newLikes.includes(userData.$id)) {
      newLikes = newLikes.filter((id) => id != userData.$id);
      setLikes(newLikes);
    } else {
      newLikes.push(userData.$id);
      setLikes(newLikes);
    }
    await service.updateLike(postId, newLikes);
  };
  return (
    <div className=" flex flex-col rounded-2xl bg-white mt-6 shadow-[-5px_-5px_10px_0px_rgba(255,255,255,1),5px_5px_27px_0px_rgba(0,0,0,0.31)]">
      <div className="flex w-full p-6">
        <div className="flex w-full gap-4 px-3">
          <div className="rounded-full border-black border-[1px] flow-root w-14 h-14 bg-black">
            <img
              src={post ? post.creator.imageUrl : "/images/avatar.jpeg"}
              alt="avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-black text-lg">
              {post.creator.name}
            </span>
            <span className="text-sm flex items-center gap-2">
              <span>{post.status == "public" ? <BiWorld /> : <MdLock />}</span>
              {new Date(post.$createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        {location.pathname.startsWith("/profile/") && (
          <button
            className="justify-self-end profilebutton"
            onClick={() => handleDelete(post)}
          >
            <MdDelete size={20} className="active fill-red-600" />
          </button>
        )}
      </div>
      <div id="caption" className="text-md px-6">
        {post.caption}
      </div>
      <div className="w-full px-4 flex justify-center">
        <img
          src={post ? post.imageUrl : "/img/background.jpeg"}
          alt="post-img"
          className="object-cover w-full"
        />
      </div>
      <div className="flex p-3 w-1/2 justify-around">
        <button className="profilebutton" onClick={() => handleLike(post.$id)}>
          <FaHeart
            size={25}
            className={
              likes.includes(userData?.$id) ? "activate" : " fill-white"
            }
          />
          <span className="ml-2">{likes.length}</span>
        </button>
        <button className="profilebutton">
          <BsFillChatTextFill size={25} className="active fill-white" />
        </button>
        <button className="profilebutton">
          <FaShare size={25} className="active fill-white" />
        </button>
      </div>
    </div>
  );
};

export default PostForm;
