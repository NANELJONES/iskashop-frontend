import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { useDispatch , useSelector} from "react-redux";
import { loadUser } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";


const Login = () => {
  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.user);
  // useEffect(() => {
  //   if (isAuthenticated === true) {
  //     toast.success("Successfully authenticated!");

  //   }else{
  //     toast.error("Failed to authenticate!");
  //   }
  // }, [isAuthenticated,]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
       
        setCookie("token", res.data.token);
        localStorage.setItem('token', res.data.token)
        toast.success("Login Success!");
        loadUser()
        navigate("/profile");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-[9999]">
          <div className="bg-white p-8 rounded-lg shadow-xl flex items-center space-x-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary_color"></div>
            <p className="text-text_color text-lg font-semibold">Logging in...</p>
          </div>
        </div>
      )}



      {/* <Header/> */}
      <div className="min-h-screen bg-gray-50 flex max-w-[1300px] mx-auto flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center flex-col md:flex-row items-center px-4 ">

          <div className="lg:w-[40%] w-2/3 "><img src='/User/user_login.svg' alt="" className ="w-full" /></div>
          {/* this is the forms  */}
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            {/* these are the buttons */}
            <div className="flex justify-start items-start gap-4">
              <button className=" tbg-primary_color border-2 border-secondary_color text-text_color bg-primary_color   px-4 py-[1em] px-10 rounded-md "> Login</button>
              <Link to="/sign-up"><button className="text-primary_color border border-primary_color  px-10 py-[1em] rounded-md "> Sign Up</button></Link>
            </div>
            <br/>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-left">
                Customer <br/>
                Login and Sign up
              </h2>
              <p>Login into your account to continue and get access to all the features of Iska Shop</p>
            </div>
            <div className="bg-white py-8 px-4   ">

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-primary_color rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-primary_color focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={visible ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-primary_color rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {visible ? (
                      <AiOutlineEye
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                </div>
                <div className={`${styles.noramlFlex} justify-between`}>
                  <div className={`${styles.noramlFlex}`}>
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="h-4 w-4 text-primary_color focus:ring-blue-500 border-primary_color rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="forgot-password"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4  bg-secondary_color text-text_color border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
                <div className={`${styles.noramlFlex} w-full`}>
                  <p>Not have any account?</p>
                  <Link to="/sign-up" className="text-secondary_color pl-2">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>


        </div>




      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Login;
