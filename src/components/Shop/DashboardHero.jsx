import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { CiMoneyBill } from "react-icons/ci";
import AccountReview from "./AccountReview";
import DataCard from "../DataVisualization/DataCard";
import RevenueChart from "../DataVisualization/RevenueChart";
import { FaPaperPlane } from "react-icons/fa";
import AnimateDown from "../Animations/AnimateDown";


const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
     dispatch(getAllOrdersOfShop(seller._id));
     dispatch(getAllProductsShop(seller._id));

     console.log(orders);
     
  }, [dispatch]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const columns = [
    { 
      field: "product", 
      headerName: "Product", 
      minWidth: 200,
      flex: 1,
      headerClassName: 'font-Poppins text-[#17637C]',
      cellClassName: 'font-Poppins text-[#17637C]',
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <img 
              src={params.value.image} 
              alt={params.value.name}
              className="w-[35px] h-[35px] object-cover rounded-full"
            />
            <span>{params.value.name}</span>
          </div>
        );
      }
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      headerClassName: 'font-Poppins text-[#17637C]',
      cellClassName: (params) => {
        return `font-Poppins text-primary_color ${
          params.getValue(params.id, "status") === "Delivered"
            ? "greenColor"
            : "redColor"
        }`;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
      headerClassName: 'font-Poppins text-[#17637C]',
      cellClassName: 'font-Poppins text-[#17637C]'
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
      headerClassName: 'font-Poppins text-[#17637C]',
      cellClassName: 'font-Poppins text-[#17637C]'
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders && orders.forEach((item) => {
    row.push({
        id: item._id,
        product: {
          name: item.cart[0]?.name || "N/A",
          image: item.cart[0]?.images[0]?.url || "/no-image.png"
        },
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "GH₵ " + item.totalPrice,
        status: item.status,
    });
  });
  return (


    <>
    {seller.adminData.shopApproval === "Pending" && (
      <AccountReview message="Dashboard" img_path="/account_review.svg" />
    )}

 {seller.adminData.shopApproval === "Approved" && (
    <div className="w-full p-8">
    <h1 className="font-Poppins pb-2">Overview</h1>
    <div className="w-full grid grid-row-1 grid-cols-1 md:grid-cols-3 gap-4">

<AnimateDown>
      <DataCard heading="All Orders" value={orders && orders.length} icon={<MdBorderClear size={20} className="mr-2 " fill="primary_color" />} link="/dashboard-orders" />
</AnimateDown>



<AnimateDown>
      <DataCard heading="Promotions" value="0" icon={<FaPaperPlane size={20} className="mr-2 text-primary_color "  fill="primary_color" />} link="/shop-promotions" />
</AnimateDown>




      <AnimateDown>
      <DataCard heading="All Products" value={products && products.length} icon={<MdBorderClear size={20} className="mr-2 " fill="primary_color" />} link="/dashboard-products" />
</AnimateDown>

  
    </div>


<RevenueChart  orders={orders}/>

    <br />
    <h3 className=" font-Poppins pb-2">Latest Orders</h3>
    <div className="w-full min-h-[45vh] bg-white rounded">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        sx={{
          border: '1px solid #17637C',
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '2px solid #17637C',
            borderWidth: '2px',
            paddingBottom: '15px'
          },
          '& .MuiDataGrid-cell': {
            borderColor: '#17637C'
          },
          '& .MuiDataGrid-columnSeparator': {
            color: '#17637C'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '2px solid #17637C'
          }
        }}
      />
    </div>
  </div>
 )}
    </>
  );
};

export default DashboardHero;
