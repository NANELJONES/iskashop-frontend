import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";


const Singup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !email || !password || !phoneNumber){
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    
    axios
      .post(`${server}/user/create-user`, { name, email, password, phoneNumber })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setphoneNumber("");
      })
      .catch((error) => {
        toast.error( error.response.data.message)
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
<>
<Header/>
<div className="min-h-screen max-w-[1300px] mx-auto bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-[rgba(0,0,00.8)] bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary_color mr-2"></div>
            <p className="text-text_color">Signing up...</p>
          </div>
        </div>
      )}
    


    <div className="flex justify-center flex-col md:flex-row items-center px-4 ">
      <div className="lg:w-[40%] w-2/3 "><img src='/User/user_sign_up.svg' alt="" classNamw ="w-full" /></div>
    <div className="lg:w-[60%] mt-8  sm:mx-auto   sm:w-full sm:max-w-md">

      {/* these are the buttons */}
      <div className="flex justify-start items-start gap-4">
     <Link to="/login"> <button className=" text-primary_color border border-primary_color  px-10 py-[1em] rounded-md "> Login</button></Link>
      <button className="bg-primary_color border-2 border-secondary_color text-text_color px-4 py-[1em] px-10 rounded-md"> Sign Up</button>
      </div>

    <div className="sm:mx-auto  sm:w-full sm:max-w-md">
        <h2 className="mt-6 ">
         Customer Sign Up
        </h2>

        <h6 className="text-left text-primary_color text-sm">A product we invented over 150 years ago, and one we have been reinven</h6>


      </div>
        <div className="bg-white py-8  ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-primary_color"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number 
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phoneNumber"
                  autoComplete="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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


            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center items-center max-w-[150px] bg-secondary_color py-2 px-4 text-sm font-medium text-text_color bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <p>Already have an account?</p>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
</>
  );
};

export default Singup;
