import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../server';




const PromotionalRate = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    name: '',
    rate: 0,
    level: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all promotional rates
  useEffect(() => {
    const fetchPromotions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${server}/advertisement/get-all-promotional-rates`);
        setPromotions(response.data.data);
      } catch (err) {
        setError('Failed to fetch promotional rates');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  const handleAddPromotion = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId !== null) {
        // Update existing promotion
        const response = await axios.put(
          `${server}/advertisement/update-promotional-rate/${editingId}`,
          newPromotion
        );
        setPromotions(promotions.map(promo => 
          promo._id === editingId ? response.data.data : promo
        ));
        setEditingId(null);
      } else {
        // Create new promotion
        const response = await axios.post(
          `${server}/advertisement/promotional-rate/create`,
          newPromotion
        );
        setPromotions([...promotions, response.data.data]);
      }
      setNewPromotion({ name: '', rate: 0, level: '', description: '' });
    } catch (err) {
      setError('Failed to save promotional rate');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (promotion) => {
    setNewPromotion({
      name: promotion.name,
      rate: promotion.rate,
      level: promotion.level,
      description: promotion.description
    });
    setEditingId(promotion._id);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${server}/advertisement/delete-promotional-rate/${id}`);
      setPromotions(promotions.filter(promo => promo._id !== id));
    } catch (err) {
      setError('Failed to delete promotional rate');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Promotional Rate Management</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      {/* Add/Edit Form */}
      <form onSubmit={handleAddPromotion} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Promotion Name"
            value={newPromotion.name}
            onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
            className="border text-sm p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Rate"
            value={newPromotion.rate || ''}
            onChange={(e) => setNewPromotion({ ...newPromotion, rate: Number(e.target.value) })}
            className="border text-sm p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Level"
            value={newPromotion.level}
            onChange={(e) => setNewPromotion({ ...newPromotion, level: e.target.value })}
            className="border text-sm p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={newPromotion.description}
            onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
            className="border text-sm text-primary_color p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary_color text-text_color px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 
           (editingId !== null ? 'Update Promotion' : 'Add Promotion')}
        </button>
      </form>

      {/* Promotions List */}
      {isLoading && promotions.length === 0 ? (
        <p>Loading promotional rates...</p>
      ) : (
        <div className="space-y-4">
          {promotions.map((promotion) => (
            <div 
              key={promotion._id} 
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{promotion.name}</h3>
                <p>Rate: ${promotion.rate}</p>
                <p>Level: {promotion.level}</p>
                <p className="text-sm text-gray-600">{promotion.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(promotion)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 disabled:bg-yellow-300"
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(promotion._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300"
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};























const VendorPromotions= () => {
  return (
    <div>
      <h2>Error:404: Failed To fetch data from backend </h2>
    </div>
  )
}
const AdminPromotions = () => {
  const [selectedOption, setSelectedOption] = useState('promotionalRate');
  return (
    <div>
      <h2>All Promotions</h2>
      <div className='flex gap-2'>
        <button className={`  px-4 py-2 rounded ${selectedOption === 'promotionalRate' ? 'bg-primary_color text-text_color' : 'text-primary_color bg-transparent border border-primary_color'}`} onClick={() => setSelectedOption('promotionalRate')}>Promotional Rate</button>
        <button className={`  px-4 py-2 rounded ${selectedOption === 'vendorPromotions' ? 'bg-primary_color text-text_color' : 'text-primary_color bg-transparent border border-primary_color'}`} onClick={() => setSelectedOption('vendorPromotions')}>Vendor Promotions</button>
    
      </div>
      {selectedOption === 'promotionalRate' && <PromotionalRate />}
      {selectedOption === 'vendorPromotions' && <VendorPromotions />}
    </div>
  )
}

export default AdminPromotions
