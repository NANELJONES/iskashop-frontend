import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const ProfileWishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  }

  return (
    <div className="  w-full   z-10">
      <div className="h-full  w-full bg-white flex flex-col  justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
        
           
            <h5 className="text-center  mx-auto   font-bold my-auto w-full">Wishlist Items is empty!</h5>
       
        ) : (
          <>
            <div>
           
              {/* Item length */}
              <div className={`flex items-center p-4`}>
                <AiOutlineHeart size={25}  />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* cart Single Items */}
           
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
  const [value, setValue] = useState(1);
  console.log(data);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4 max-w-[300px] ">
      <div className="w-full 800px:flex flex-col items-center">
       
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-full h-min  border-primary_color rounded-[5px]"
        />

        <div className="pl-[5px] flex  flex-col items-center">
          <h5>{data.name}</h5>
          <h6 className="font-[600] pt-3   ">
            {totalPrice}
          </h6>
        </div>
        <div className="flex items-center bg-primary_color p-4 justify-between w-full" >
       
            <p className="cursor-pointer w-full text-center text-[#ffffff]  "
        onClick={() => removeFromWishlistHandler(data)}
        >Remove From Wishlist</p>
        </div>
       
        <div className="flex mt-2  items-center bg-primary_color p-4 justify-around w-full" >
       
      <div className="flex items-center">
      <p className="cursor-pointer w-full text-[#ffffff]  "
   onClick={() => addToCartHandler(data)}
   >Add To Cart</p>
  <BsCartPlus className="text-text_color"  size={20}/>
      </div>
   
   </div>
      </div>
    </div>
  );
};

export default ProfileWishlist;
