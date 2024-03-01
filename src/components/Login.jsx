import React, { useState } from "react";

import { login as authLogin } from "../Store/authSlice";
import Button from "./Button";
import Input from "./Input";
import { UseDispatch, useDispatch } from "react-redux";
import authService from "../Appwrite/Auth.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setEerror] = useState("");
  const login = async (data) => {
    setEerror("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setEerror(error);
    }
  };
  return (
    <div className=" flex items-center justify-center w-full">
      <div
        className={` mx-auto w-full max-w-lg
         bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className=" mb-2 flex justify-center ">
            <span className=" inline-block w-full max-w-[100px]">

                logo
            </span>

</div>

        <h2>Sign in to your account</h2>
        <p className=" mt-2 text-center text-base text-black/60">
          Don&apos;t have any account ? &nbsp;
          <Link
            to="/signup"
            className=" font-medium text-primary transition-all duration-200 hover: underline"
          >
            Sing Up
          </Link>
        </p>
        {error && <p className=" text-red-600 mt-8 text-center ">{error}</p>}
        <form action="" onSubmit={handleSubmit(login)}>
          <div className=" space-y-5">
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
            <Button type="submit " className=" w-full">
              Sign in{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
