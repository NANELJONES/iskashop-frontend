import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data,isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full w-[22em] rounded-lg shadow-md p-3  relative cursor-pointer">
        {/* <div className="flex justify-end"></div> */}
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="h-[200px] w-[200px] mx-auto   object-contain"
          />
        </Link>
       
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <h5 className="pb-1 pt-1 border-b border-primary_color border-t font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h5>
          
{/* 
          <div className="flex">
          <Ratings rating={data?.ratings} />
          </div> */}

          <div className="py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 justify-center">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                Gh
              </h5>
              <p className={`line-through `}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </p>
            </div>
            <span className="font-[400] text-[10px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>
        <Link className="flex items-center gap-2" to={`/shop/preview/${data?.shop._id}`}>
          <img src={data.shop.logo} alt="" className="w-[30px] h-[30px] border-2 border-primary_color rounded-full" /> <p className={`text-primary_color`}>{data.shop.name}</p>
        </Link>
        {/* side options */}
        <div className="flex items-center mt-2 px-4 justify-between top-5 p-2 rounded-lg b gap-4 bg-primary_color">
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer "
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#fff"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer "
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#fff"}
              title="Add to wishlist"
            />
          )}
              <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer "
            onClick={() => addToCartHandler(data._id)}
            color="#fff"
            title="Add to cart"
          />
          <AiOutlineEye
            size={22}
            className="cursor-pointer "
            onClick={() => setOpen(!open)}
            color="#fff"
            title="Quick view"
          />
      
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
