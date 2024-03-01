import React from "react";
import Logout from "./Logout";
import Container from "../Container/Container";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => {
    state.auth.status;
  });
  const navigate = useNavigate();
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <div>
      <Container>
        <nav className=" flex">
          <div className=" mr-4 ">
            <Link to="/">logo</Link>
          </div>
          <ul className=" flex ml-auto ">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className=" inline-block px-6 py-2 duration-200 hover: bg-blue-100 rounded-full"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {
              authStatus&&(
                <li>
                  <Logout/>
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
