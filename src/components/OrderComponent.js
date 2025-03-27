import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi'; // Make sure to install react-icons if not already installed

const OrderComponent = ({ orders }) => {
  const row = [];

  orders && orders.forEach((item) => {
    row.push({
      id: item._id,
      product: {
        name: item.cart[0]?.name || "N/A",
        image: item.cart[0]?.images[0]?.url || "/no-image.png"
      },
      paidAt: new Date(item.paidAt).toLocaleDateString(),
      customer: item.user?.name || 'N/A',
      itemsQty: item.cart.reduce((acc, item) => acc + (item.qty || 1), 0),
      products: item.cart.map(item => item.name).join(', '),
      total: "GH₵ " + item.totalPrice,
      status: item.status,
    });
  });

  return (
    <div className="w-full overflow-x-auto">
      {/* Desktop View */}
      <div className="hidden md:block min-w-full">
        <div className="grid grid-cols-7 bg-gray-100 p-4 text-sm font-semibold border-b-2 border-[#17637C] text-primary_color">
          <div className="col-span-2">Product</div>
          <div>Date</div>
          <div>Customer</div>
          <div>Items</div>
          <div>Total</div>
          <div>Status</div>
        </div>

        <div className="bg-white">
          {row.map((order) => (
            <div key={order.id} className="grid grid-cols-7 p-4 text-sm border-b border-[#17637C] hover:bg-gray-50 text-primary_color">
              <div className="col-span-2 flex items-center gap-3">
                <img 
                  src={order.product.image} 
                  alt={order.product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <span className="truncate font-medium">{order.product.name}</span>
              </div>
              <div className="flex items-center">{order.paidAt}</div>
              <div className="flex items-center truncate">{order.customer}</div>
              <div className="flex items-center">{order.itemsQty}</div>
              <div className="flex items-center">{order.total}</div>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${order.status === 'Processing' ? 'bg-orange-100 text-orange-800' : 
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {order.status}
                </span>
                <Link 
                  to={`/order/${order.id}`}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <HiArrowRight className="w-5 h-5 text-primary_color" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {row.map((order) => (
          <div key={order.id} className="bg-white mb-4 rounded-lg border border-[#17637C] text-primary_color">
            <div className="flex items-center p-4 border-b border-[#17637C]">
              <img 
                src={order.product.image} 
                alt={order.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-medium truncate">{order.product.name}</h3>
                <p className="text-sm opacity-75">{order.paidAt}</p>
              </div>
              <Link 
                to={`/order/${order.id}`}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <HiArrowRight className="w-5 h-5 text-primary_color" />
              </Link>
            </div>
            
            <div className="p-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="opacity-75">Customer:</span>
                <span className="font-medium truncate max-w-[200px]">{order.customer}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-75">Items:</span>
                <span className="font-medium">{order.itemsQty}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-75">Total:</span>
                <span className="font-medium">{order.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-75">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${order.status === 'Processing' ? 'bg-orange-100 text-orange-800' : 
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No orders message */}
      {(!orders || orders.length === 0) && (
        <div className="text-center py-4 text-primary_color">
          No orders available
        </div>
      )}
    </div>
  );
};

export default OrderComponent;