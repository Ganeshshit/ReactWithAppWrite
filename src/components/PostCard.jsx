import React from "react";

import appWriteService from "../Appwrite/config.js";

import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className=" w-full bg-gray-100 p-4 rounded-xl ">
        <div className=" w-full justify-center mb-4">
          <img
            src={appWriteService.getFilePreview(featuredImage)}
            alt="post image"
            className=" roundes-xl "
          />
        </div>
        <h2 className=" text-xl font-bold ">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
