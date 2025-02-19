import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch,user._id]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  
  const refundHandler = async () => {
    await axios.put(`${server}/order/order-refund/${id}`,{
      status: "Processing refund"
    }).then((res) => {
       toast.success(res.data.message);
    dispatch(getAllOrdersOfUser(user._id));
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  };

  return (
    <div className={`py-4  w-full min-h-screen p-[1em] ${styles.section}`}>
            <div className="w-full flex items-center bg-primary_color h-[30em] max-h-[200px]">
        <div className="ml-[2em]">
        <p className="text-text_color">Welcome</p>
        <h1 className="text-text_color">{user?.name}</h1>
        </div>
      </div>
      <div className="w-full flex items-center mt-[2em] justify-between">
        <div className="flex items-center">
          {/* <BsFillBagFill size={30} color="crimson" /> */}
          <h2 className=" ">Order Details</h2>
        </div>
      </div>

      <div className="w-full flex items-center   gap-[2em]  pt-6">
        <p className="">
          Order ID: <br/> <span>#{data?._id}</span>
        </p>
        <p className="">
          Placed on: <br/> <span>{data?.createdAt?.slice(0, 10)}</span>
        </p>
      </div>

      {/* order items */}
      <br />
   
      {data &&
        data?.cart.map((item, index) => {
          return(
          <div className="w-full border bg-text_color gap-[1em] flex-wrap justify-between shadow-md rounded-md md:flex-nowrap md:justify-start border-primary_color p-4 flex  items-start mb-5">
            <img
              src={`${item.images[0]?.url}`}
              alt=""
              className="w-[150] h-[150px] "
            />

            <div className="  flex flex-col md:w-2/3 gap-2 ">
              <h5 className=" ">{item.name}</h5>
              <h5 className=" ">
                Gh {item.discountPrice} 
              </h5>

              <div className="flex items-center gap-2">
              <img src={`${item.shop?.avatar?.url}`} className="w-[40px] h-[40px] object-cover rounded-full border-2 bg-gray_bg border-primary_color "  />   
              <h6 className="text-sm">{item.shop?.name} <br/>
            <p className="text-xs">  {item.shop?.address.split(" ")[0]}</p>
              </h6>
              </div>
            </div>
{/* Quantity */}
            <div className=" w-1/3">
              <h6 className="">
              Qty: <br/>
                {item.qty} 
              </h6>
            </div>
{/* Total Price */}
            <div className=" w-1/3">
              <h6 className="">
                Total: <br/>
                {item.qty *item.discountPrice}
              </h6>
            </div>

            {!item.isReviewed && data?.status === "Delivered" ?  <div
                className={`${styles.button} text-[#fff]`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a review
              </div> : (
             null
            )}
          </div>
          )
         })}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${selectedItem?.images[0]?.url}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div>
                <div className="pl-3 ">{selectedItem?.name}</div>
                <h4 className="pl-3 ">
                  Gh ${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3  font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block  font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expresion about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`${styles.button} text-white  ml-3`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full flex items-center mt-[4em] justify-between text-right">
      <h5 className="pt-3 ">
          Total Price: 
        </h5>
        <h5 className="pt-3 ">
          <strong>Gh ${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      {/* Full Delivery Details */}
      <div className="w-full 800px:flex flex-col items-start">
      <h2 className="pt-3 font-[600]">Delivery Details:</h2>
      <div className="p-[2em] border rounded-md shadow-md border-primary_color ">
        {/* User Delivery Details */}
      <div className="w-full grid grid-cols-2 gap-4 lg:grid-cols-3 ">
          {/* Personal Info */}
          <p><strong>Name: </strong> <br/> {data?.user?.name}</p>
          <p><strong>Email: </strong>  <br/> {data?.user?.name}</p>
          <p><strong>Phone: </strong>  <br/> {data?.user?.name}</p>
          {/* Address */}
          <p className="pt-3 ">
            <strong>Address: </strong> <br/>
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </p>
          <p className=" "> <strong>Country : </strong> <br/> {data?.shippingAddress.country}</p>
          <p className=" "> <strong>City : </strong> <br/> {data?.shippingAddress.city}</p>

          {/* Delivery Type */}
          <p><strong>Delivery Type: </strong> <br/> {"Iska Delivery"}</p>
          <p><strong>Arrival Date: </strong>  <br/> {"12 May 2025"}</p>
          <p><strong>Delivery Status: </strong>  <br/> {"Incoming"}</p>
     
     {/* Order Code and Paymenr */}
     <p><strong>Payment Status: </strong> <br/> {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</p>
     <p><strong>Order Method: </strong>  <br/> {"Cash on Delivery"} </p>
     <p><strong>Payment Code: </strong> <br/> ""</p>
     
     
     
        </div>
              {/* Delivery Cost */}
        <div className="w-full flex justify-between  mt-[2em] border-t border-primary_color pt-3">
          <h6>Delivery Cost</h6>
          <h4> <strong>Gh 20.00</strong></h4>
        </div>
      </div>



              <br/>
              <br/>

    
  
  
  
      </div>






























      {/* Order Summary */}
      <div className="w-full 800px:flex flex-col items-start ">
      
      <div className="p-[2em] w-full border rounded-md shadow-md border-primary_color ">
      <h4 className="pt-3 font-[600]">Order Summary:</h4>
              {/* Total Price */}
        <div className="w-full flex justify-between  mt-[2em] pt-3">
          <p>Sub Total</p>
          <h6>Gh {data?.totalPrice}</h6>
        </div>

                      {/* Delivery Price */}
        <div className="w-full flex justify-between  mt-[2em]  pt-3">
          <p>Delivery</p>
          <h6>Gh 20.00</h6>
        </div>

        <div className="w-full flex justify-between  mt-[2em]  pt-3">
          <p>Taxes</p>
          <h6>Gh 5.00</h6>
        </div>

                              {/* Delivery Price */}
        <div className="w-full border-t border-primary_color py-[1em] flex justify-between  mt-[2em]  pt-3">
          <p>Total</p>
          <strong> <h4>Gh {data?.totalPrice + 20 + 5}</h4></strong>
        </div>

        










      </div>





   
      </div>





















      {/* <br />
      <Link to="/">
        <div className={`${styles.button} text-white`}>Send Message</div>
      </Link>
      <br /> */}
      <br />
    </div>
  );
};

export default UserOrderDetails;
