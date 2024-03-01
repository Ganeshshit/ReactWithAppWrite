import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { login } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../Appwrite/Auth";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.creatAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.meassage);
    }
  };

  return (
    <div className=" flex items-center justify-center ">
      <div
        className={` m-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        {" "}
        <div className=" mb-2 flex justify-center ">
          <span className=" inline-block w-full max-w-[100px]">logo</span>
        </div>
      </div>

      <h2>Sign up to create account</h2>
      <p className=" mt-2 text-center text-base text-black/60">
        Already have an account?
        <Link
          to="/login"
          className=" font-medium text-primary transition-all duration-200 hover: underline"
        >
          Sing in
        </Link>
      </p>
      {error && (
        <p
          className=" text-red-600 mt-8 text-center
         "
        >
          {error}
        </p>
      )}
      <form action="" onSubmit={handleSubmit(create)}>
        <div className=" space-y-5">
          <Input
            label="Name"
            placeholder="Enter your Full Name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email "
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'/.test(
                    value
                  ) || "Email address Must be avalid address",
              },
            })}
          />
          <Input
            label="Password"
            type="Password"
            placeholder="Enter password"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className=" w-full
          "
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
