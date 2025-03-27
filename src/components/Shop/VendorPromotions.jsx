import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai'
import { getAllProductsShop } from '../../redux/actions/product';
import { RxCross1 } from 'react-icons/rx';
import DatePicker from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

import { Link } from 'react-router-dom';


import { FiEdit } from 'react-icons/fi';




const CreateVendorPromotion = () => {
  const dispatch = useDispatch();

  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  
  // Add console logs to debug
  useEffect(() => {
 
    console.log("Products:", products);
  }, [seller, products]);

  // Add loading state for initial data
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [promotions, setPromotions] = useState([]);
  const [promotionalRates, setPromotionalRates] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedPromotionalRate, setSelectedPromotionalRate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  
  // Calculate total days and cost with null checks
  const totalDays = endDate && startDate ? 
    Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1 : 
    0;
  
  const totalCost = selectedPromotionalRate?.rate ? 
    (selectedPromotionalRate.rate * totalDays).toFixed(2) : 
    0;

  // Fetch promotional rates
  const fetchPromotionalRates = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/advertisement/get-all-promotional-rates`);
      setPromotionalRates(data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching promotional rates');
    } finally {
      setLoading(false);
    }
  };

  // Modify your useEffect to handle initial loading
  useEffect(() => {
    const init = async () => {
      try {
        setIsInitialLoading(true);
        await fetchPromotionalRates();
        await dispatch(getAllProductsShop(seller?._id));
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    init();
  }, []);

  // Filter products belonging to the current seller with null checks
  const sellerProducts = products?.filter(product => product?.shopId === seller?._id) || [];

const gun = async (e) => {

e.preventDefault();

console.log(

  
  "vendor_id:", seller._id,
  "product_id:", selectedProduct,
  "promotional_rate:", selectedPromotionalRate,
  "total_cost:", totalCost,
  "total_days:", totalDays,
  "start_date:", startDate,
  "end_date:", endDate,
  "promotion_status:", startDate > new Date() ? 'Promotion Not Started' : 'Ongoing',
  "payment_status:", 'Pending'

);
}

  // Add loading overlay state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check each field individually with specific error messages
    if (!selectedProduct) {
      toast.error('Please select a product');
      return;
    }

    if (!selectedPromotionalRate?._id) {
      toast.error('Please select a promotional rate');
      return;
    }

    if (!startDate) {
      toast.error('Please select a start date');
      return;
    }

    if (!endDate) {
      toast.error('Please select an end date');
      return;
    }

    // If all validations pass, proceed with form submission
    try {
      setLoading(true);
      setIsSubmitting(true);
      const { data } = await axios.post(`${server}/advertisement/create-promotion`, {
        vendor_id: seller?._id,
        product_id: selectedProduct,
        promotional_rate: selectedPromotionalRate,
        total_cost: totalCost,
        total_days: totalDays,
        start_date: startDate,
        end_date: endDate,
        promotion_status: startDate > new Date() ? 'Promotion Not Started' : 'Ongoing',
        payment_status: 'Pending'
      });
      
      setPromotions(prevPromotions => [...(prevPromotions || []), data]);
      toast.success('Promotion created successfully!');
      
      // Reset form
      setSelectedProduct('');
      setSelectedPromotionalRate(null);
      setDateRange([null, null]);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error creating promotion');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // Add a loading state check in your render
  if (isInitialLoading) {
    return (
      <div className="w-full p-4">
        <h2>Loading...</h2>
      </div>
    );
  }

  // Add a check for required data
  if (!seller ) {
    return (
      <div className="w-full p-4">
        <h2>Please login as a vendor to view promotions</h2>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {isSubmitting && <LoadingOverlay />}
      <h2 className="text-2xl font-bold mb-6">Shop Promotions</h2>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Create New Promotion</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
            <select
              value={selectedProduct || ''}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-2 border border-primary_color rounded text-primary_color focus:outline-none focus:ring-2 focus:ring-secondary_color"
              required
            >
              <option value="">Select a product</option>
              {sellerProducts?.map((product) => (
                <option key={product?._id} value={product?._id}>
                  {product?.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Promotional Rate Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Promotional Rate</label>
            <select
              value={selectedPromotionalRate?._id || ''}
              onChange={(e) => {
                const rate = promotionalRates?.find(r => r?._id === e.target.value);
                setSelectedPromotionalRate(rate);
              }}
              className="w-full p-2 border border-primary_color rounded text-primary_color focus:outline-none focus:ring-2 focus:ring-secondary_color"
              required
            >
              <option value="">Select a promotional rate</option>
              {promotionalRates?.map((rate) => (
                <option key={rate?._id} value={rate?._id}>
                  {rate?.name} (GH₵{rate?.rate}/day) - Level: {rate?.level}
                </option>
              ))}
            </select>
          </div>
          
          {/* Date Range Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Promotion Period</label>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              minDate={new Date()}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select date range"
              required
            />
          </div>
          
          {/* Display calculated cost */}
          <div className="bg-gray-50 p-4 rounded">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Rate per day:</span>
              <span>GH₵{selectedPromotionalRate?.rate || 0}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total days:</span>
              <span>{totalDays}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total cost:</span>
              <span>GH₵{totalCost}</span>
            </div>
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-4 rounded text-text_color font-medium ${
              loading ? 'bg-blue-300 opacity-50' : 'bg-primary_color hover:bg-blue-700'
            }`}
          >
            {loading ? 'Processing...' : 'Create Promotion'}
          </button>
        </form>
      </div>
      
      {/* Existing Promotions List */}
      {/* <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Your Active Promotions</h3>
        {!promotions?.length ? (
          <p className="text-gray-500">No promotions created yet</p>
        ) : (
          <div className="space-y-4">
            {promotions?.map((promotion) => (
              <div key={promotion?._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">
                      {products?.find(p => p?._id === promotion?.product_id)?.name || 'Product'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {promotion?.promotional_rate?.name} (Level: {promotion?.promotional_rate?.level})
                    </p>
                    <p className="text-sm">
                      {new Date(promotion?.start_date).toLocaleDateString()} - {new Date(promotion?.end_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      Status: <span className="font-medium">{promotion?.promotion_status}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">${promotion?.total_cost}</span>
                    <button className="text-red-500 hover:text-red-700">
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};















const AllVendorPromotions = () => {
  const { seller } = useSelector((state) => state.seller);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch vendor promotions
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${server}/advertisement/promotions/vendor/${seller._id}`
        );
        setPromotions(data.data);
        console.log("Promotions:", data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching promotions');
      } finally {
        setLoading(false);
      }
    };

    if (seller?._id) {
      fetchPromotions();
    }
  }, [seller?._id]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle delete promotion
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${server}/promotion/delete/${id}`);
      setPromotions(promotions.filter((promo) => promo._id !== id));
      toast.success('Promotion deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting promotion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6">All Promotions</h2>

      {loading && promotions.length === 0 ? (
        <p>Loading promotions...</p>
      ) : promotions.length === 0 ? (
        <p className="text-gray-500">No promotions found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white  overflow-hidden shadow">
            <thead className="bg-gray-50">
              <tr className='text-primary_color card'>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary_color uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary_color uppercase tracking-wider">
                  Promotion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary_color uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary_color uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary_color uppercase tracking-wider">
                  Cost
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {promotions.map((promotion) => (
                <tr key={promotion._id} className=' text-primary_color cursor-pointer'>
                  <td className="px-6 py-4 whitespace-nowrap">
                    
                      <Link to={`/seller-product/${promotion.product_id }`}>

                    <div className="text-sm items-center flex gap-2 font-medium text-gray-900">
                  
                 
                  
                  <img src={promotion.product.images[0]?.url} alt="Product" className="w-10 h-10 rounded-full" />
                  {promotion.product.name || 'N/A'}
                </div>
                    
                    
                    </Link>
               


                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {promotion.promotional_rate?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Level: {promotion.promotional_rate?.level}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(promotion.start_date)} -{' '}
                      {formatDate(promotion.end_date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {promotion.total_days} days
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        promotion.promotion_status === 'Ongoing'
                          ? 'bg-green-100 text-green-800'
                          : promotion.promotion_status === 'Promotion Not Started'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {promotion.promotion_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    GH₵{promotion.total_cost.toFixed(2)}
                  </td>

{/*                   
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(promotion._id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                    <button
                      disabled={loading}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FiEdit size={18} />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Define LoadingOverlay as a separate component
const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary_color mx-auto mb-4"></div>
      <p className="text-lg font-semibold text-gray-700">Creating Promotion...</p>
      <p className="text-sm text-gray-500">Please wait while we process your request</p>
    </div>
  </div>
);








const VendorPromotions = () => {
  const [activeComponent, setActiveComponent] = useState('create'); // Default to create view

  return (
    <div>
      <br/>
      <h2 className=" font-bold mb-6">Vendor Promotions</h2>
      
      {/* Navigation Buttons */}
      <div className='flex gap-4 mb-6'>
        <button
          onClick={() => setActiveComponent('create')}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeComponent === 'create'
              ? 'bg-primary_color text-text_color'
              : 'bg-gray-200 text-primary_color hover:bg-gray-300'
          }`}
        >
          Create Promotions
        </button>
        
        <button
          onClick={() => setActiveComponent('all')}
          className={`px-6 py-3 rounded-lg font-medium ${
            activeComponent === 'all'
              ? 'bg-primary_color text-text_color'
              : 'bg-gray-200 text-primary_color hover:bg-gray-300'
          }`}
        >
          All Promotions
        </button>
      </div>

      {/* Render Components */}
      {activeComponent === 'create' ? (
        <CreateVendorPromotion />
      ) : (
        <AllVendorPromotions />
      )}
    </div>
  );
};

export default VendorPromotions;