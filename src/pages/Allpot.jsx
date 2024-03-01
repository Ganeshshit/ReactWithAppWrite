import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../Appwrite/config";

const Allpot = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  appwriteService.getPost([]).then((posts) => setPosts(posts));
  return (
    <div className=" w-full py-8">
      <Container>
        <div className=" flex flex-wrap">
          {posts.map((post) => (
            <div className=" p-2 w-1" key={post.$id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Allpot;
