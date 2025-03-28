import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        {
          headers: {
          'token': localStorage.getItem('token')
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-red-50 p-3 rounded-full">
                <BsFillBagFill size={24} color="#e94560" />
              </div>
              <h3 className="font-bold text-gray-900">Order Details</h3>
            </div>
            <Link to="/dashboard-orders">
              <button className="bg-primary_color text-text_color px-6 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors">
                Order List
              </button>
            </Link>
          </div>
        </div>

        {/* Order Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-medium">#{data?._id?.slice(0, 8)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Placed on:</span>
                <span className="font-medium">{data?.createdAt?.slice(0, 10)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className={`font-medium ${data?.paymentInfo?.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                  {data?.paymentInfo?.status || "Not Paid"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-4">
            {data?.cart.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg border-b border-primary_color last:border-b-0">
                <div className="w-full sm:w-24 h-24">
                  <img
                    src={`${item.images[0]?.url}`}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</h3>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Price</span>
                      <span className="font-medium text-gray-900">US${item.discountPrice}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Quantity</span>
                      <span className="font-medium text-gray-900">{item.qty}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Total</span>
                      <span className="font-medium text-gray-900">US${item.discountPrice * item.qty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Order Amount:</span>
              <span className="text-xl font-bold text-gray-900">US${data?.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address Section */}
        {/* <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
          <div className="space-y-2">
            <p className="text-gray-700 text-sm sm:text-base">
              {data?.shippingAddress.address1} {data?.shippingAddress.address2}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">{data?.shippingAddress.country}</p>
            <p className="text-gray-700 text-sm sm:text-base">{data?.shippingAddress.city}</p>
            <p className="text-gray-700 text-sm sm:text-base">{data?.user?.phoneNumber}</p>
          </div>
        </div> */}

        {/* Order Status Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {data?.status !== "Processing refund" && data?.status !== "Refund Success" ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-2"
              >
                {[
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ]
                  .slice(
                    [
                      "Processing",
                      "Transferred to delivery partner",
                      "Shipping",
                      "Received",
                      "On the way",
                      "Delivered",
                    ].indexOf(data?.status)
                  )
                  .map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
              </select>
            ) : (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 py-2"
              >
                {["Processing refund", "Refund Success"]
                  .slice(["Processing refund", "Refund Success"].indexOf(data?.status))
                  .map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
            <button
              onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
              className="w-full sm:w-auto bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
