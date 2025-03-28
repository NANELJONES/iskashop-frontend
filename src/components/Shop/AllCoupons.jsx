import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns,setCoupouns] = useState([]);
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
        headers: {
          'token': localStorage.getItem('token')
        },
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials: true,
      headers: {
        'token': localStorage.getItem('token')
      },
    }).then((res) => {
      toast.success("Coupon code deleted succesfully!")
    })
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            'token': localStorage.getItem('token')
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
       toast.success("Coupon code created successfully!");
       setOpen(false);
       window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { 
      field: "id", 
      headerName: "Id", 
      minWidth: 150, 
      flex: 0.7,
      headerClassName: 'font-Poppins text-[#17637C]',
      cellClassName: 'font-Poppins text-[#17637C]'
    },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
      headerClassName: 'font-Poppins text-[#17637C]',
      cellClassName: 'font-Poppins text-[#17637C]'
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
      headerClassName: 'font-Poppins text-[#17637C]',
      cellClassName: 'font-Poppins text-[#17637C]'
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      headerClassName: 'font-Poppins text-[#17637C]',
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} className="text-primary_color" />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupouns &&
  coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-1 mt-10 bg-white">
          <div className="flex justify-between flex-wrap items-center mb-4">
            <h3 className="font-bold text-primary_color"> Coupon & Discount Codes</h3>
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 bg-primary_color  !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-text_color text-sm ">Create Coupon Code</span>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              className="font-Poppins w-full"
              sx={{
                width: '100%',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8f9fa',
                  borderBottom: '2px solid #e5e7eb',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #e5e7eb',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f8f9fa',
                }
              }}
            />
          </div>
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] max-w-[500px] p-[2em] overflow-y-auto min-h-[80vh] md:max-h-[600px] bg-white_bg rounded-md shadow">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer hover:text-primary_color transition-colors"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h3 className="text-left font-Poppins  mb-6">
                  Create Coupon code
                </h3>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={name}
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color transition-all duration-200"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your coupon code name..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Discount Percentage <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="value"
                        value={value}
                        required
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color transition-all duration-200"
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter your coupon code value..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Min Amount
                      </label>
                      <input
                        type="number"
                        name="value"
                        value={minAmount}
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color transition-all duration-200"
                        onChange={(e) => setMinAmout(e.target.value)}
                        placeholder="Enter your coupon code min amount..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Max Amount
                      </label>
                      <input
                        type="number"
                        name="value"
                        value={maxAmount}
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color transition-all duration-200"
                        onChange={(e) => setMaxAmount(e.target.value)}
                        placeholder="Enter your coupon code max amount..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Selected Product
                    </label>
                    <select
                      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color transition-all duration-200"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products" className="text-sm">
                        Choose a selected product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name} className="text-sm">
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-primary_color text-text_color px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      Create Coupon
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
