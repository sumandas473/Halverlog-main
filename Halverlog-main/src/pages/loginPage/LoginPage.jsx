import { FaUserTie } from "react-icons/fa6";
import { BiSolidLock } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth.js";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authStatus) {
      navigate("/");
    }
  }, [authStatus, navigate]);

  const loginAccount = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        // console.log("userData :", userData);
        if (userData) dispatch(login({ userData }));
        navigate("/");
      } else {
        setError("Invalid Authentication check email or password");
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-auto justify-center items-center h-full w-full bg-[#e4f0f7] min-w-max min-h-[100vh]">
      <div className="flex flex-col w-1/4 p-4 shrink justify-around items-center bg-[#ECEEF0] shadow-[-4px_-4px_19px_11px_rgba(255,255,255,1),14px_19px_36px_8px_rgba(0,0,0,0.5)] rounded-[40px] min-w-[320px] min-h-[520px] max-h-[580px]">
        <div className="rounded-full w-28 h-28 p-3 flex shrink bg-[#ECEEF0] shadow-[-6px_-3px_17px_0px_rgba(255,255,255,1),7px_6px_13px_0px_rgba(0,0,0,0.31)]">
          <img src="/icons/user.png" alt="logo" />
        </div>
        <form
          onSubmit={handleSubmit(loginAccount)}
          className="flex flex-col w-full items-center mt-6"
        >
          <div className="flex flex-row items-center bg-[#ECEEF0] w-4/5 h-[45px] px-6 shadow-[-4px_-4px_12px_0px_rgba(255,255,255,1)_inset,4px_2px_12px_0px_rgba(0,0,0,0.25)_inset] rounded-3xl hover:scale-105  duration-500 ">
            <span>
              <FaUserTie color="grey" size={20} />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="outline-none bg-inherit flex-1 mx-3 w-[90%]"
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex flex-row items-center bg-[#ECEEF0] w-4/5 h-[45px] px-6 hover:scale-105 duration-500 shadow-[-4px_-4px_12px_0px_rgba(255,255,255,1)_inset,4px_2px_12px_0px_rgba(0,0,0,0.25)_inset] rounded-3xl mt-4">
            <span>
              <BiSolidLock color="grey" size={20} />
            </span>
            <input
              type="password"
              placeholder="password"
              className="outline-none bg-inherit flex-1 mx-3 w-[90%]"
              {...register("password", { required: true })}
            />
          </div>
          {error && (
            <p className=" bg-red-400 text-white text-sm mt-2 px-4 py-1 w-[80%] text-center rounded-2xl">
              {error}
            </p>
          )}
          <span className="text-xs text-gray-500 font-semibold mt-3 active">
            <a href="">forgotten password ?</a>
          </span>
          <button
            type="submit"
            className="w-4/5 h-[45px] bg-[#4482BF] rounded-3xl text-white font-semibold mt-4 hover:scale-105 duration-500 shadow-[-5px_-4px_16px_0px_rgba(255,255,255,1),4px_5px_13px_0px_rgba(0,0,0,0.63)]"
          >
            {!isLoading ? "Login" : <BeatLoader size={10} color="#064482" />}
          </button>
          <span className="text-xs text-gray-500 font-semibold mt-3">
            <Link to="/register" className="text-sky-600 mr-1">
              Register
            </Link>
            Or login with
          </span>
          <div className="flex w-4/5 place-content-around mt-5">
            <div className="flex justify-center items-center bg-[#ECEEF0] hover:scale-110 duration-500 w-10 h-10 shadow-[-4px_-3px_4px_0px_rgba(255,255,255,1),3px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-lg">
              <a href="">
                <FaFacebookF color="grey" size={20} className="active" />
              </a>
            </div>
            <div className="flex justify-center items-center bg-[#ECEEF0] hover:scale-110 duration-500 w-10 h-10 shadow-[-4px_-3px_4px_0px_rgba(255,255,255,1),3px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-lg">
              <a href="">
                <FaGoogle color="grey" size={20} className="active" />
              </a>
            </div>
            <div className="flex justify-center items-center bg-[#ECEEF0] hover:scale-110 duration-500 w-10 h-10 shadow-[-4px_-3px_4px_0px_rgba(255,255,255,1),3px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-lg">
              <a href="">
                <FaTwitter color="grey" size={20} className="active" />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
