import React from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineEye, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const AllProductsComponent = ({ products }) => {
    const columns = [
        {
          field: "name",
          headerName: "Product",
          headerClassName: 'font-Poppins text-[#17637C]',
          minWidth: 200,
          flex: 1.5,
          renderCell: (params) => {
            const product = products.find((p) => p._id === params.id);
            return (
              <div className="flex items-center gap-2">
                <img
                  src={product?.images[0]?.url}
                  alt={params.value}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-primary">{params.value}</span>
              </div>
            );
          },
        },
        {
          field: "price",
          headerName: "Price",
          headerClassName: 'font-Poppins text-[#17637C]',
          minWidth: 100,
          flex: 0.6,
          renderCell: (params) => (
            <span className="text-primary">{params.value}</span>
          ),
        },
        {
          field: "Stock",
          headerName: "Stock",
          type: "number",
          headerClassName: 'font-Poppins text-[#17637C]',
          minWidth: 80,
          flex: 0.5,
          renderCell: (params) => (
            <span className="text-primary">{params.value}</span>
          ),
        },
        {
          field: "category",
          headerName: "Category",
          headerClassName: 'font-Poppins text-[#17637C]',
          minWidth: 150,
          flex: 1,
          renderCell: (params) => (
            <span className="text-primary">{params.value}</span>
          ),
        },
        {
          field: "sold",
          headerName: "Sold out",
          type: "number",
          headerClassName: 'font-Poppins text-[#17637C]',
          minWidth: 100,
          flex: 0.6,
          renderCell: (params) => (
            <span className="text-primary">{params.value}</span>
          ),
        },
        {
          field: "Preview",
          flex: 0.5,
          minWidth: 80,
          headerName: "",
          headerClassName: 'font-Poppins text-[#17637C]',
          sortable: false,
          renderCell: (params) => {
            return (
              <Link to={`/seller-product/${params.id}`}>
                <Button className="text-primary hover:text-primary/80">
                  <AiOutlineEye size={20} />
                </Button>
              </Link>
            );
          },
        },
    ];

    const row = [];

    products &&
      products.forEach((item) => {
        row.push({
          id: item._id,
          name: item.name,
          price: "US$ " + item.discountPrice,
          Stock: item.stock,
          category: item.category,
          sold: item?.sold_out,
        });
      });

  return (
    <div className="w-full">
    
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        className="text-primary"
        sx={{
          width: '100%',
          '& .MuiDataGrid-cell': {
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f8fafc',
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--primary-color)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: 'var(--primary-color)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          },
          '@media (max-width: 640px)': {
            '& .MuiDataGrid-cell': {
              fontSize: '12px',
            },
            '& .MuiDataGrid-columnHeader': {
              fontSize: '13px',
            },
          },
        }}
      />
    </div>
  )
}

export default AllProductsComponent
