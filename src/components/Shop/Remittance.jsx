import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const BANKS = {
  'ACCESS': 'Access Bank',
  'ECOBANK': 'Ecobank',
  'CALBANK': 'Cal Bank',
  'CAPITAL': 'Capital Bank',
  'CITIBANK': 'Citibank',

  'FBNBANK': 'FBNBank',
  'FIDELITY': 'Fidelity Bank',
  'GCB': 'GCB Bank',
  'GT': 'GT Bank',
  'STANBIC': 'Stanbic Bank',
  'STANDARD_CHARTERED': 'Standard Chartered',
  'UBA': 'UBA',
  'ZENITH': 'Zenith Bank',
  'OTHER': 'Other'
};

const Remittance = () => {
  const { seller } = useSelector((state) => state.seller);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('bank');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [editingMethod, setEditingMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [bankFormData, setBankFormData] = useState({
    paymentMethod: 'bank',
    bankName: '',
    customBankName: '',
    accountNumber: '',
    accountName: '',
    branchCode: '',
    swiftCode: '',
    primary: false
  });

  const [mobileFormData, setMobileFormData] = useState({
    paymentMethod: 'mobilemoney',
    network: '',
    accountName: '',
    mobileNumber: '',
    primary: false
  });



  const fetchPaymentMethods = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${server}/shop/remittance/${seller._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }
      const data = await response.json();
      setPaymentMethods(data || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Fetch payment methods on component mount
  useEffect(() => {
   

    if (seller?._id) {
      fetchPaymentMethods();
    }
  }, [seller._id]);

  const handleBankChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setBankFormData({
      ...bankFormData,
      [e.target.name]: value
    });
  };

  const handleMobileChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setMobileFormData({
      ...mobileFormData,
      [e.target.name]: value
    });
  };

  const handleEdit = (id) => {
    const method = paymentMethods.find(method => method.id === id);
    if (!method) return;

    setEditingMethod(id);
    
    if (method.paymentMethod === 'bank') {
      setBankFormData(method);
      setShowBankModal(true);
    } else {
      setMobileFormData(method);
      setShowMobileModal(true);
    }
  };

  const handleDelete = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      try {
        const response = await fetch(`${server}/shop/remittance/${seller._id}/${paymentId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete payment method');
        }

        const result = await response.json();
        setPaymentMethods(result.data);
        toast.success('Payment method deleted successfully');
      } catch (error) {
        console.error('Error deleting payment method:', error);
        toast.error(error.message);
      }
    }
  };

  const handlePrimaryChange = async (paymentId) => {
    try {
      // Update locally first for better UX
      const updatedMethods = paymentMethods.map(method => ({
        ...method,
        primary: method.id === paymentId
      }));
      setPaymentMethods(updatedMethods);

      // Then update on server
      const response = await fetch(`${server}/shop/remittance/${seller._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remittanceDetails: updatedMethods }),
      });

      if (!response.ok) {
        throw new Error('Failed to update primary payment method');
      }

      toast.success('Primary payment method updated');
    } catch (error) {
      console.error('Error updating primary payment method:', error);
      toast.error(error.message);
      // Revert if failed
      fetchPaymentMethods();
    }
  };

  const handleAddPayment = () => {
    if (selectedOption === 'bank') {
      setBankFormData({
        paymentMethod: 'bank',
        bankName: '',
        customBankName: '',
        accountNumber: '',
        accountName: '',
        branchCode: '',
        swiftCode: '',
        primary: false
      });
      setShowBankModal(true);
    } else {
      setMobileFormData({
        paymentMethod: 'mobilemoney',
        network: '',
        accountName: '',
        mobileNumber: '',
        primary: false
      });
      setShowMobileModal(true);
    }
    setEditingMethod(null);
  };

  const handleSubmitBank = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const newEntry = {
        ...bankFormData,
        id: editingMethod ? bankFormData.id : uuidv4(),
        bankName: bankFormData.bankName === 'Other' ? bankFormData.customBankName : bankFormData.bankName
      };

      let updatedMethods;
      if (editingMethod) {
        updatedMethods = paymentMethods.map(method => 
          method.id === editingMethod ? newEntry : method
        );
      } else {
        updatedMethods = [...paymentMethods, newEntry];
      }

      // If new entry is primary, ensure others are not
      if (newEntry.primary) {
        updatedMethods = updatedMethods.map(method => ({
          ...method,
          primary: method.id === newEntry.id
        }));
      }

      const response = await fetch(`${server}/shop/remittance/${seller._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remittanceDetails: updatedMethods }),
      });

      if (!response.ok) {
        throw new Error('Failed to save bank details');
      }

      const result = await response.json();
      setPaymentMethods(result.data);
      setShowBankModal(false);
      toast.success('Bank details saved successfully');
    } catch (error) {
      console.error('Error saving bank details:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitMobile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const newEntry = {
        ...mobileFormData,
        id: editingMethod ? mobileFormData.id : uuidv4()
      };

      let updatedMethods;
      if (editingMethod) {
        updatedMethods = paymentMethods.map(method => 
          method.id === editingMethod ? newEntry : method
        );
      } else {
        updatedMethods = [...paymentMethods, newEntry];
      }

      // If new entry is primary, ensure others are not
      if (newEntry.primary) {
        updatedMethods = updatedMethods.map(method => ({
          ...method,
          primary: method.id === newEntry.id
        }));
      }

      const response = await fetch(`${server}/shop/remittance/${seller._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remittanceDetails: updatedMethods }),
      });

      if (!response.ok) {
        throw new Error('Failed to save mobile money details');
      }

      const result = await response.json();
      setPaymentMethods(result.data);
      setShowMobileModal(false);
      toast.success('Mobile money details saved successfully');
    } catch (error) {
      console.error('Error saving mobile money details:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (method) => {
    const details = {
      ID: method.id,
      Type: method.paymentMethod === 'bank' ? 'Bank Transfer' : 'Mobile Money',
      ...(method.paymentMethod === 'bank' 
        ? {
            'Bank Name': method.bankName,
            'Account Number': method.accountNumber,
            'Account Name': method.accountName,
            'Branch Code': method.branchCode,
            'Swift Code': method.swiftCode,
          }
        : {
            'Network': method.network,
            'Account Name': method.accountName,
            'Mobile Number': method.mobileNumber,
          }
      ),
      'Primary': method.primary ? 'Yes' : 'No'
    };

    alert(JSON.stringify(details, null, 2));
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-6">Payment Methods</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <select 
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="border rounded px-3 py-2 bg-transparent w-full md:w-auto"
        >
          <option value="bank">Bank Transfer</option>
          <option value="mobile">Mobile Money</option>
        </select>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleAddPayment}
            disabled={isLoading}
            className="bg-primary_color hover:bg-blue-600 text-white_bg px-4 py-2 rounded flex-1 md:flex-none"
          >
            {isLoading ? 'Loading...' : 'Add New Payment Method'}
          </button>
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Saved Payment Methods</h2>
        {isLoading && !paymentMethods.length ? (
          <p>Loading payment methods...</p>
        ) : paymentMethods.length === 0 ? (
          <p className="text-gray-500">No payment methods saved yet.</p>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div 
                key={method.id} 
                className="border rounded-lg card p-4 bg-white_bg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleViewDetails(method)}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {method.paymentMethod === 'bank' ? method.bankName : method.network}
                      {method.primary && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {method.accountName} • {method.paymentMethod === 'bank' 
                        ? method.accountNumber 
                        : method.mobileNumber}
                    </p>
                    {method.paymentMethod === 'bank' && (
                      <p className="text-sm text-gray-600 mt-1">
                        {method.branchCode && `Branch: ${method.branchCode}`}
                        {method.swiftCode && ` • Swift: ${method.swiftCode}`}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <label 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrimaryChange(method.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={method.primary || false}
                        onChange={() => {}}
                        className="form-checkbox h-4 w-4"
                      />
                      <span className="text-sm">Primary</span>
                    </label>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(method.id);
                      }}
                      className="text-primary_color hover:text-blue-700 p-1"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(method.id);
                      }}
                      className="text-primary_color hover:text-red-700 p-1"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bank Modal */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white_bg rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">
                {editingMethod ? 'Edit Bank Details' : 'Add Bank Details'}
              </h2>
              <button
                onClick={() => setShowBankModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                disabled={isLoading}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitBank} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name*
                  </label>
                  <select
                    name="bankName"
                    value={bankFormData.bankName}
                    onChange={handleBankChange}
                    required
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
                  >
                    <option value="">Select bank</option>
                    {Object.values(BANKS).map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>

                {bankFormData.bankName === 'Other' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Bank Name*
                    </label>
                    <input
                      type="text"
                      name="customBankName"
                      value={bankFormData.customBankName}
                      onChange={handleBankChange}
                      required
                      placeholder="Enter your bank name"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number*
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={bankFormData.accountNumber}
                  onChange={handleBankChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Name*
                </label>
                <input
                  type="text"
                  name="accountName"
                  value={bankFormData.accountName}
                  onChange={handleBankChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch Code
                </label>
                <input
                  type="text"
                  name="branchCode"
                  value={bankFormData.branchCode}
                  onChange={handleBankChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Swift Code
                </label>
                <input
                  type="text"
                  name="swiftCode"
                  value={bankFormData.swiftCode}
                  onChange={handleBankChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="primary"
                  checked={bankFormData.primary}
                  onChange={handleBankChange}
                  className="form-checkbox h-4 w-4"
                  id="bankPrimary"
                />
                <label htmlFor="bankPrimary" className="text-sm cursor-pointer">
                  Set as primary payment method
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBankModal(false)}
                  disabled={isLoading}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary_color hover:bg-blue-600 text-white_bg rounded disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Money Modal */}
      {showMobileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white_bg rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">
                {editingMethod ? 'Edit Mobile Money' : 'Add Mobile Money'}
              </h2>
              <button
                onClick={() => setShowMobileModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                disabled={isLoading}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitMobile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Network*
                </label>
                <select
                  name="network"
                  value={mobileFormData.network}
                  onChange={handleMobileChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
                >
                  <option value="">Select network</option>
                  <option value="MTN">MTN</option>
                  <option value="AirtelTigo">AirtelTigo</option>
                  <option value="Vodafone">Vodafone</option>
                  <option value="Telecel">Telecel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Name*
                </label>
                <input
                  type="text"
                  name="accountName"
                  value={mobileFormData.accountName}
                  onChange={handleMobileChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number*
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={mobileFormData.mobileNumber}
                  onChange={handleMobileChange}
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary_color"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="primary"
                  checked={mobileFormData.primary}
                  onChange={handleMobileChange}
                  className="form-checkbox h-4 w-4"
                  id="mobilePrimary"
                />
                <label htmlFor="mobilePrimary" className="text-sm cursor-pointer">
                  Set as primary payment method
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMobileModal(false)}
                  disabled={isLoading}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary_color hover:bg-blue-600 text-white_bg rounded disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Remittance;