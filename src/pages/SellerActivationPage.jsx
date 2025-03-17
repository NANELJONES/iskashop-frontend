import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/shop/activation`, {
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

  function goToLogin() {
   
    setTimeout(() => {
     if(!error) {
      navigate("/shop-login");
     }else{
      navigate("/shop-create");
     }
    }, 3000);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>There was an error setting up your account. Please try again later.</p>
      ) : (
      <div className="flex max-w-[800px] flex-col items-center justify-center h-full"> 
      <img src={'/completed/bro.svg'} alt="logo" className="w-full  max-w-[500px]" />
      
        <h2 className=" md:w-2/3 text-center font-bold">Your account has been created suceessfully!</h2>
      <Link to="/shop-login" className="bg-secondary_color text-text_color px-10 py-4 "> Go to Sign in </Link>
</div> 
      )}

      {goToLogin() }
    </div>
  );
};

export default SellerActivationPage;
