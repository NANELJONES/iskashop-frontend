import React, { useEffect } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";
import LayoutContainer from "../components/Admin/Layout/LayoutContainer";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, []);

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
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "preview",
      headerName: "Preview",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.id}`}>
            <button className="text-primary_color hover:underline">
              View Details
            </button>
          </Link>
        );
      },
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0,10),
      });
    });
  return (
    <div>
      <LayoutContainer>
        <div className="relative admin_container_div w-full overflow-x-hidden">
          <AdminSideBar active={2} />
          <div className="w-full min-h-[45vh] rounded flex justify-center">
            <div className="w-full max-w-full px-4">
              <AdminHeader />
              <h2>All Orders</h2>
              <div className="w-full overflow-x-auto">
                <DataGrid
                  rows={row}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  autoHeight
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      color: "var(--primary-color)",
                      fontWeight: "bold"
                    },
                    "& .MuiDataGrid-cell": {
                      color: "var(--primary-color)"
                    },
                    width: "100%",
                    overflowX: "auto"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default AdminDashboardOrders;
