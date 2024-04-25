import { FaUserTie } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../../appwrite/auth.js";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authStatus) {
      navigate("/");
    }
  }, [authStatus, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setIsLoading(true);
    try {
      const userAccount = await authService.createAccount(data);
      if (userAccount) {
        navigate("/login");
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-auto justify-center items-center h-full w-full bg-[#e4f0f7] min-w-max min-h-[100vh]">
      <div className="flex flex-col w-1/4 p-4 justify-evenly shrink items-center bg-[#ECEEF0] shadow-[-4px_-4px_19px_11px_rgba(255,255,255,1),14px_19px_36px_8px_rgba(0,0,0,0.5)] rounded-[45px] min-h-[550px] max-h-[780px] min-w-[320px]">
        {error && (
          <p className="bg-red-400 text-white text-sm rounded-2xl px-4 py-1 text-center">
            {error}
          </p>
        )}
        <div className="rounded-full w-24 h-24 p-3 flex shrink bg-[#ECEEF0] shadow-[-6px_-3px_17px_0px_rgba(255,255,255,1),7px_6px_13px_0px_rgba(0,0,0,0.31)]">
          <img src="/icons/user.png" alt="logo" />
        </div>
        <form
          onSubmit={handleSubmit(create)}
          className="flex flex-col w-full items-center mt-4"
        >
          <div className="flex flex-row items-center text-sm bg-[#ECEEF0] w-4/5 h-[45px] px-6 shadow-[-4px_-4px_12px_0px_rgba(255,255,255,1)_inset,4px_2px_12px_0px_rgba(0,0,0,0.25)_inset] rounded-3xl hover:scale-105  duration-500 ">
            <span>
              <FaUserTie color="grey" size={20} />
            </span>
            <input
              type="username"
              placeholder="username"
              className="outline-none bg-inherit mx-3 w-[85%]"
              {...register("username", {
                required: true,
                pattern: /^[a-zA-Z\s\d]+$/,
              })}
            />
          </div>
          {errors.username && (
            <p className="text-red-400 px-10 text-xs">username must required</p>
          )}
          <div className="flex flex-row items-center text-sm bg-[#ECEEF0] w-4/5 h-[45px] px-6 shadow-[-4px_-4px_12px_0px_rgba(255,255,255,1)_inset,4px_2px_12px_0px_rgba(0,0,0,0.25)_inset] rounded-3xl hover:scale-105  duration-500 mt-4">
            <span>
              <MdEmail color="grey" size={20} />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="outline-none bg-inherit mx-3 w-[85%]"
              {...register("email", {
                required: true,
                pattern: /^([^\s@]+@[^\s@]+\.[^\s@]+)$/,
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 px-10 text-xs">enter a valid email</p>
          )}
          <div className="flex flex-row items-center text-sm bg-[#ECEEF0] w-4/5 h-[45px] px-6 hover:scale-105 duration-500 shadow-[-4px_-4px_12px_0px_rgba(255,255,255,1)_inset,4px_2px_12px_0px_rgba(0,0,0,0.25)_inset] rounded-3xl mt-4">
            <span>
              <MdDriveFileRenameOutline color="grey" size={20} />
            </span>
            <input
              type="text"
              placeholder="Full Name"
              className="outline-none bg-inherit mx-3 w-[85%]"
              {...register("name", {
                required: true,
              })}
            />
          </div>
          {errors.FullName && (
            <p className="text-red-400 text-xs px-10">must enter the field</p>
          )}
          <div className="flex flex-row items-center text-sm bg-[#ECEEF0] w-4/5 h-[45px] px-6 hover:scale-105 duration-500 shadow-[-4px_-4px_12px_0px_rgba(255,255,255,1)_inset,4px_2px_12px_0px_rgba(0,0,0,0.25)_inset] rounded-3xl mt-4">
            <span>
              <BiSolidLock color="grey" size={20} />
            </span>
            <input
              type="password"
              placeholder="password"
              className="outline-none bg-inherit mx-3 w-[85%]"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs px-10">
              Password must be 8 digit and contains capital,small,number,symbol
            </p>
          )}
          <button
            type="submit"
            className="w-4/5 h-[45px] bg-[#4482BF] rounded-3xl text-white font-semibold mt-4 hover:scale-105 duration-500 shadow-[-5px_-4px_16px_0px_rgba(255,255,255,1),4px_5px_13px_0px_rgba(0,0,0,0.63)]"
          >
            {!isLoading ? "Register" : <BeatLoader size={10} color="#064482" />}
          </button>
          <span className="text-xs text-gray-500 font-semibold mt-3">
            Already have an account ?
            <Link to="/login" className="text-sky-600 ml-1">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
export default Register;
