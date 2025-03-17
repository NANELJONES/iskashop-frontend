import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";

const AllSellers = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [approvalStatus, setApprovalStatus] = useState({});
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true ,
        headers: {
       
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllSellers());
  };

  const handleApprovalChange = (id, status) => {
    setSelectedSeller(id);
    setSelectedStatus(status);
    setShowApprovalModal(true);
  };

  const updateShopApproval = async (shopId, approvalValue) => {
    try {
      const response = await axios.put(
        `${server}/shop/update-shop-approval`,
        { 
          shopId,
          approvalValue 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        toast.success("Shop approval status updated successfully!");
        setApprovalStatus((prev) => ({ ...prev, [shopId]: approvalValue }));
        dispatch(getAllSellers());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating shop approval status");
    }
  };

  const handleApprovalConfirm = () => {
    updateShopApproval(selectedSeller, selectedStatus);
    setShowApprovalModal(false);
  };

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 130, flex: 0.7 },
    { field: "email", headerName: "Email", type: "text", minWidth: 130, flex: 0.7 },
    { field: "address", headerName: "Seller Address", type: "text", minWidth: 130, flex: 0.7 },
    { field: "joinedAt", headerName: "Joined At", type: "text", minWidth: 130, flex: 0.8 },
    {
      field: "preview",
      flex: 1,
      minWidth: 150,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/shop/preview/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: "delete",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => setUserId(params.id) || setOpen(true)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
    {
      field: "approvalStatus",
      headerName: "Approval Status",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <select
          value={approvalStatus[params.id] || "Pending"}
          onChange={(e) => handleApprovalChange(params.id, e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Denied">Denied</option>
          <option value="Approved">Approved</option>
        </select>
      ),
    },
  ];

  const row = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: item.createdAt.slice(0, 10),
        address: item.address,
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        
        {/* Delete Confirmation Modal */}
        {open && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[999] flex items-center justify-center">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-text_color rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins">
                Are you sure you want to delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} !rounded-none text-text_color bg-primary_red text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} !rounded-none text-text_color bg-primary_color text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Approval Confirmation Modal */}
        {showApprovalModal && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[999] flex items-center justify-center">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-text_color rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setShowApprovalModal(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins ">
                Are you sure you want to set this seller's status to "{selectedStatus}"?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} !rounded-none text-text_color bg-primary_red text-[18px] !h-[42px] mr-4`}
                  onClick={() => setShowApprovalModal(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} !rounded-none text-text_color bg-primary_color text-[18px] !h-[42px] ml-4`}
                  onClick={handleApprovalConfirm}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
