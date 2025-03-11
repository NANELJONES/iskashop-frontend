import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { server } from "../../../server";

const SingleDeliveryCompany = ({ deliveryCompany }) => {
  const [variants, setVariants] = useState([]); // Existing variants from API
  const [newVariant, setNewVariant] = useState([]); // New variants to be added
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  
  const fetchVariants = async () => {
    try {
      const response = await axios.get(`${server}/distanceCostVariation/get-distance-cost-variations`, 
         { params:{companyName: deliveryCompany.companyName }},
      );

      console.log("these are the variants of the company", response  )


      setVariants(response.data.variations);
    } catch (err) {
      toast.error("Could not fetch variants: " + err.message);
    }
  };

  const addNewVariant = () => {
    setNewVariant([
      ...newVariant,
      {
        deliveryCompany: deliveryCompany.companyName,
        min_distance: "",
        max_distance: "",
        cost: "", // Set initial cost to an empty string
        country: deliveryCompany.country,
        district: [],
        isEditing: true,
      },
    ]);
  };

  const publishVariant = async (index) => {
    const variant = newVariant[index];
variant.cost = Number(variant.cost);
variant.min_distance = Number(variant.min_distance);
variant.max_distance = Number(variant.max_distance);

console.log(variant);

if (
  variant.min_distance === null || variant.min_distance === undefined ||
  variant.max_distance === null || variant.max_distance === undefined ||
  variant.cost === null || variant.cost === undefined ||
  !variant.country || variant.district.length === 0
) {
  toast.error("Please fill all fields ");
  return;
}





    try {
      const response = await axios.post(`${server}/distanceCostVariation/add-new-cost-variation`, variant);
      toast.success("Variant published successfully");
      
      setNewVariant(newVariant.filter((_, i) => i !== index));
      fetchVariants()
    } catch (error) {
      toast.error("Failed to publish variant: " + error.message);
    }
  };

  const cancelVariant = (index) => {
    setNewVariant(newVariant.filter((_, i) => i !== index));
  };

  const saveChanges = async (index) => {
    const variant = variants[index];
  
    // Run validations
    // Using == null catches both null and undefined
    if (
      variant.deliveryCompany == null || variant.deliveryCompany === "" ||
      variant.min_distance == null ||
      variant.max_distance == null ||
      variant.cost == null ||
      variant.country == null || variant.country.trim() === "" ||
      !Array.isArray(variant.district) || variant.district.length === 0
    ) {
      toast.error("Please fill all fields");
      return;
    }
  
    // Optionally, convert numeric values in case they're coming as strings.
    variant.min_distance = Number(variant.min_distance);
    variant.max_distance = Number(variant.max_distance);
    variant.cost = Number(variant.cost);
  
    try {
      await axios.put(`${server}/distanceCostVariation/update-cost-variation`, variant);
      toast.success("Variant updated successfully");
      const updatedVariants = [...variants];
      updatedVariants[index].isEditing = false;
      setVariants(updatedVariants);
    } catch (error) {
      toast.error("Failed to update variant: " + error.message);
    }
  };
  

  const deleteVariant = async () => {
    console.log("this is the delete index", variants[deleteIndex])


    
    try {
      await axios.delete(`${server}/distanceCostVariation/delete-cost-variation`, 
        {
            data: { _id: variants[deleteIndex]._id }
          }
      );
      toast.success("Variant deleted successfully");
      fetchVariants()
 
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete variant: " + error.message);
    }
  };

  const handleChange = (index, field, value, isNew) => {
    const updatedList = isNew ? [...newVariant] : [...variants];
    updatedList[index][field] = value; // No conversion to Number
    isNew ? setNewVariant(updatedList) : setVariants(updatedList);
  };
  



  const handleDistrictChange = (index, selectedDistrict, isNew) => {
    const updatedList = isNew ? [...newVariant] : [...variants];
    const currentDistricts = updatedList[index].district;

    if (currentDistricts.includes(selectedDistrict)) {
      updatedList[index].district = currentDistricts.filter((d) => d !== selectedDistrict);
    } else {
      updatedList[index].district = [...currentDistricts, selectedDistrict];
    }

    isNew ? setNewVariant(updatedList) : setVariants(updatedList);
  };

  useEffect(() => {
    console.log("fetching variant is running ")
    fetchVariants();

  }, [deliveryCompany]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold mb-6 text-gray-700">Distance Cost Variation for {deliveryCompany.companyName}</h1>
        <button onClick={addNewVariant} className="bg-primary_color text-text_color text-sm p-2 rounded hover:bg-blue-600">
          Add New Distance Cost Variation
        </button>
      </div>

      {/* Render new variants */}
      {newVariant.map((variant, index) => (
        <div key={index} className="border relative p-4 rounded-lg shadow-sm bg-white gap-[0.3em] mb-[10px] flex justify-evenly items-start">
          {/* Delivery Company (read-only) */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Delivery Company</label>
            <input
              type="text"
              value={variant.deliveryCompany}
              readOnly
              className="w-full p-2 border rounded text-sm bg-gray-200"
            />
          </div>

          {/* Min Distance */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Min Distance (km)</label>
            <input
              type="number"
              value={variant.min_distance}
              onChange={(e) => handleChange(index, "min_distance", e.target.value, true)}
              className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Distance */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Max Distance (km)</label>
            <input
              type="number"
              value={variant.max_distance}
              onChange={(e) => handleChange(index, "max_distance", e.target.value, true)}
              className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cost */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Cost (GHS)</label>
            <input
  type="number"
  value={variant.cost}
  onChange={(e) => handleChange(index, "cost", e.target.value, true)}
  className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500"
/>
          </div>

          {/* Country (read-only) */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Country</label>
            <input
              type="text"
              value={variant.country}
              readOnly
              className="w-full p-2 border rounded text-sm bg-gray-200"
            />
          </div>

          {/* Districts */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Districts</label>
            <select
              onChange={(e) => handleDistrictChange(index, e.target.value, true)}
              className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select District</option>
              {deliveryCompany.district.map((district, i) => (
                <option key={i} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap gap-2 mt-2">
              {variant.district.map((d, i) => (
                <span key={i} className="bg-gray-200 p-1 text-sm rounded flex items-center">
                  {d}
                  <button
                    onClick={() => handleDistrictChange(index, d, true)}
                    className="ml-2 text-red-500"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Buttons for new variant */}
          <div className="flex gap-2">
            <button onClick={() => publishVariant(index)} className="bg-green-500 text-white text-sm p-2 rounded hover:bg-green-600">
              Publish
            </button>
            <button onClick={() => cancelVariant(index)} className="bg-red-500 text-white text-sm p-2 rounded hover:bg-red-600">
              Cancel
            </button>
          </div>
        </div>
      ))}

      {/* Render existing variants */}
      {variants.map((variant, index) => (
        <div key={index} className="border relative flex-wrap items-start  p-4 rounded-lg shadow-sm bg-white gap-[0.3em] mb-[10px] flex  items-start">
          {/* Delivery Company (read-only) */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Delivery Company</label>
            <input
              type="text"
              value={variant.deliveryCompany}
              readOnly
              className="w-full p-2 border rounded text-sm bg-gray-200"
            />
          </div>

          {/* Min Distance */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Min Distance (km)</label>
            <input
              type="number"
              value={variant.min_distance}
              onChange={(e) => handleChange(index, "min_distance", e.target.value, false)}
              disabled={!variant.isEditing}
              className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            />
          </div>

          {/* Max Distance */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Max Distance (km)</label>
            <input
              type="number"
              value={variant.max_distance}
              onChange={(e) => handleChange(index, "max_distance", e.target.value, false)}
              disabled={!variant.isEditing}
              className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            />
          </div>

          {/* Cost */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Cost (GHS)</label>
            <input
              type="number"
              value={variant.cost}
              onChange={(e) => handleChange(index, "cost", e.target.value, false)}
              disabled={!variant.isEditing}
              className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            />
          </div>

          {/* Country (read-only) */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Country</label>
            <input
              type="text"
              value={variant.country}
              readOnly
              className="w-full p-2 border rounded text-sm bg-gray-200"
            />
          </div>

          {/* Districts */}
          <div className="flex flex-col gap-[0.2em]">
            <label className="block text-sm text-gray-600">Districts</label>
            <select
              onChange={(e) => handleDistrictChange(index, e.target.value, false)}
              disabled={!variant.isEditing}
              className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            >
              <option value="">Select District</option>
              {deliveryCompany.district.map((district, i) => (
                <option key={i} value={district}>
                  {district}
                </option>
              ))}
            </select>

            {/* these are the districts  */}
            <div className="flex  flex-wrap gap-2 mt-2">
              {variant.district.map((d, i) => (
                <span key={i} className="bg-gray-200 p-1 text-sm rounded flex items-center">
                  {d}
                  <button
                    onClick={() => handleDistrictChange(index, d, false)}
                    className="ml-2 text-red-500"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Buttons for existing variant */}
          <div className="flex  gap-2">
            {variant.isEditing ? (
              <button onClick={() => saveChanges(index)} className="bg-green-500 text-white text-sm p-2 rounded hover:bg-green-600">
                Save Changes
              </button>
            ) : (
              <CiEdit onClick={() => handleChange(index, "isEditing", true, false)} className="text-primary_color text-[0.4em] border rounded-full border-primary_color p-2 cursor-pointer" />
            )}
            <MdDelete onClick={() => { setDeleteIndex(index); setShowDeleteModal(true); }} className="bg-red-500 text-primary_color text-[0.4em] border rounded-full p-2 cursor-pointer hover:bg-red-600" />
          </div>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this variant?</h2>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white text-sm p-2 rounded hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={deleteVariant} className="bg-red-500 text-white text-sm p-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DeliveryCostVariation = ({ deliveryCompanies }) => {
  return (
    <div>
      {deliveryCompanies.map((each_deliveryCompany, index) => (
        <SingleDeliveryCompany key={index} deliveryCompany={each_deliveryCompany} />
      ))}
    </div>
  );
};

export default DeliveryCostVariation;