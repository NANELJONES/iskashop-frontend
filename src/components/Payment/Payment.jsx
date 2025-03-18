import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        'token': localStorage.getItem('token')
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
    .post(`${server}/order/create-order`, order, config)
    
    .then((res) => {
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
  };

  return (
    <div className="w-full flex flex-col container justify-between  py-8">
      <div className="w-[90%] 1000px:w-auto block 800px:flex justify-between">
        <div className="w-full 800px:w-[30%] scale-[0.9]">
          <PaymentInfo
            user={user}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full max-w-[500px]  800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  cashOnDeliveryHandler,
}) => {
  return (
    <div className="w-full border-2 border-primary_color  800px:w-[95%] bg-[#fff] rounded-md p-5 ">
      <div>
        <div className="flex w-full pb-2 ">
          <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center">
            <div className="w-[13px] h-[13px] bg-primary_color rounded-full" />
          </div>
          <div>
            <h5 className=" pl-2 "> Cash on Delivery  </h5> 
            <h6 className=" pl-2 "> Gh 20.00 </h6>
            <p className=" pl-2 "> 2-3 Business Days  </p>
          </div>
          
        </div>

        <div className="w-full flex">
          <form className="w-full" onSubmit={cashOnDeliveryHandler}>
            <input
              type="submit"
              value="Confirm"
              className={`${styles.button} !bg-primary_color rounded-[0px] rounded-none text-[#fff] h-[45px]  cursor-pointer `}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] border-2 border-primary_color rounded-md p-5 pb-8">
      <div className="flex justify-between">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Delivery:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">{orderData?.discountPrice? "$" + orderData.discountPrice : "-"}</h5>
      </div>
  
      <div className="flex justify-between items-center">
        <p>Total</p>
        <h5>Gh{orderData?.totalPrice}</h5>
      </div>
      <br />
    </div>
  );
};

export default Payment;
