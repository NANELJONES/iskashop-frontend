import React, { useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";

const SearchAndFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('name');

  const searchFields = [
    { value: 'name', label: 'Product Name' },
    { value: 'id', label: 'Product ID' },
    { value: 'category', label: 'Category' },
    { value: 'price', label: 'Price' },
    { value: 'stock', label: 'Stock' }
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value, searchField);
    }
  };

  const handleFieldChange = (event) => {
    setSearchField(event.target.value);
    if (onSearch) {
      onSearch(searchTerm, event.target.value);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg shadow-md p-3">
      <div className="relative flex-1">
        <select
          value={searchField}
          onChange={handleFieldChange}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent border-none outline-none text-gray-600 font-medium cursor-pointer"
        >
          {searchFields.map((field) => (
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
          ))}
        </select>
        <div className="flex items-center">
          <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange}
            placeholder={`Search by ${searchFields.find(f => f.value === searchField)?.label}...`}
            className="w-full pl-32 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchAndFilter;
