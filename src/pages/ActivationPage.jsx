import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import { Link } from "react-router-dom";


const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);

          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      className="w-full max-w-[1000px] mx-auto"
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <div className="flex flex-col items-center gap-[1em] mx-auto  ">
          <img className="w-full max-w-[400px]" src="/User/signup_complete.svg"></img>
          <h2 className="text-center font-bold">Customer Sign Up  <br/>
          Completed</h2>
           <p className="text-center ">We appreciate you for joining our platform <br/> 
           Kindly click the link below to login</p>
           <Link href="/profile"><button className="w-full max-w-[200px] p-2  bg-secondary_color text-text_color">Go To Dashbaord</button></Link>
          
           </div>
       
      )}
    </div>
  );
};

export default ActivationPage;
