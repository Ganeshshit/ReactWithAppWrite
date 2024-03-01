import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/Auth";
import { login, logout } from "./Store/authSlice";
import { Footer, Header } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if(!loading)
  {
    return(
      <div className=" min-h--screen flex flex-wrap
      content-between bg-gray-400
      ">
        <div className="">
          <Header/>
          <main>

          </main>
          <Footer/>
        </div>
      </div>
    )
  }
  else{
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }
  ;
}

export default App;
