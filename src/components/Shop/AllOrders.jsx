import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import AccountReview from "./AccountReview";
import OrderComponent from "../OrderComponent";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      if (selectedStatus === 'all') {
        setFilteredOrders(orders);
      } else {
        setFilteredOrders(orders.filter(order => order.status === selectedStatus));
      }
    }
  }, [orders, selectedStatus]);

  const getStatusCounts = () => {
    if (!orders) return {};
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
  };

  const getMonthlyRevenue = () => {
    if (!orders) return [];
    const currentYear = new Date().getFullYear();
    const monthlyData = new Array(12).fill(0);
    
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      if (orderDate.getFullYear() === currentYear) {
        monthlyData[orderDate.getMonth()] += order.totalPrice;
      }
    });
    
    return monthlyData;
  };

  const getRevenueMetrics = () => {
    if (!orders) return { totalRevenue: 0, incomingRevenue: 0, totalOrders: 0 };
    
    return orders.reduce((acc, order) => {
      acc.totalRevenue += order.totalPrice;
      if (order.status === "Processing") {
        acc.incomingRevenue += order.totalPrice;
      }
      acc.totalOrders += 1;
      return acc;
    }, { totalRevenue: 0, incomingRevenue: 0, totalOrders: 0 });
  };

  const pieChartData = {
    labels: Object.keys(getStatusCounts()),
    datasets: [
      {
        data: Object.values(getStatusCounts()),
        backgroundColor: [
          '#17637C',
          '#F68B1F',
          '#9D2C2C',
          '#15D842',
          '#D9D9D9'
        ],
      },
    ],
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue (GHS)',
        data: getMonthlyRevenue(),
        backgroundColor: '#17637C',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const statusOptions = ['all', 'Processing', 'Transferred to delivery partner', 'Received', 'On the way', 'Delivered'];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
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
            <Link to={`/order/${params.id}`}>
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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      <h1 className="font-Poppins mt-10 text-primary_color">Order Insights</h1>
      
      {seller.adminData.shopApproval === "Pending" && (
        <AccountReview message="All Orders" img_path="/account_review.svg" />
      )}
      {seller.adminData.shopApproval === "Approved" && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="w-full px-[1em] mx-auto py-[2em] pt-1 mt-10 bg-white">
              {/* Status Filter */}
              <div className="mb-6">
                <label htmlFor="statusFilter" className="block mb-2 text-sm font-medium text-gray-900">Filter by Status</label>
                <select 
                  id="statusFilter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-primary_color rounded-md px-4 py-2 text-primary_color"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Orders' : status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Revenue Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 border border-primary_color rounded-lg bg-white shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-primary_color">Total Revenue</h3>
                  <p className="text-2xl font-bold text-gray-800">GHS {getRevenueMetrics().totalRevenue.toFixed(2)}</p>
                </div>
                <div className="p-6 border border-primary_color rounded-lg bg-white shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-primary_color">Incoming Revenue</h3>
                  <p className="text-2xl font-bold text-gray-800">GHS {getRevenueMetrics().incomingRevenue.toFixed(2)}</p>
                </div>
                <div className="p-6 border border-primary_color rounded-lg bg-white shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-primary_color">Total Orders</h3>
                  <p className="text-2xl font-bold text-gray-800">{getRevenueMetrics().totalOrders}</p>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 border border-primary_color rounded-lg h-[300px]">
                  <h3 className="text-lg font-semibold mb-4 text-primary_color">Order Status Distribution</h3>
                  <div className="h-[calc(100%-3rem)]">
                    <Pie data={pieChartData} options={chartOptions} />
                  </div>
                </div>
                <div className="p-4 border border-primary_color rounded-lg h-[300px]">
                  <h3 className="text-lg font-semibold mb-4 text-primary_color">Monthly Revenue</h3>
                  <div className="h-[calc(100%-3rem)]">
                    <Bar data={barChartData} options={chartOptions} />
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <OrderComponent orders={filteredOrders} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllOrders;
