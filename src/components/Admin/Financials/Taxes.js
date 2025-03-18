import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../server";
import { Country, State } from "country-state-city";


const SingleTax = ({
  tax,
  index,
  handleChange,
  publishTax,
  deleteTax,
  isNew,
  cancelEdit,
  cancelNewTax,
  saveChanges,
}) => {
  const [isEditing, setIsEditing] = useState(isNew);
  const [editedTax, setEditedTax] = useState({ ...tax });

  // Reset editedTax when the tax prop changes
  useEffect(() => {
    setEditedTax({ ...tax });
  }, [tax]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (isNew) {
      cancelNewTax(index);
    } else {
      cancelEdit(index); // Call cancelEdit for existing taxes
      setIsEditing(false); // Exit editing mode
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "country") {
      // When country changes, reset district and add all states for the new country
      const allStates = State.getStatesOfCountry(value).map((state) => state.name);
      setEditedTax({ ...editedTax, [field]: value, district: allStates });
    } else {
      setEditedTax({ ...editedTax, [field]: value });
    }
  };

  const handleDistrictChange = (selectedDistricts) => {
    // If "All States/Region" is selected
    if (selectedDistricts.includes("all")) {
      const allStates = State.getStatesOfCountry(editedTax.country).map(
        (state) => state.name
      );

      // Always set to all states when "all" is selected
      setEditedTax((prev) => ({
        ...prev,
        district: [...allStates], // Use all states
      }));
      return;
    }

    // For individual state selections
    const currentStates = editedTax.district || [];
    const allStateNames = State.getStatesOfCountry(editedTax.country).map(
      (state) => state.name
    );

    // If the current selection contains all states (meaning "All" was previously selected)
    if (
      currentStates.length === allStateNames.length &&
      allStateNames.every((state) => currentStates.includes(state))
    ) {
      // Replace with just the newly selected states
      setEditedTax((prev) => ({
        ...prev,
        district: [...selectedDistricts],
      }));
    } else {
      // Add the newly selected states to existing selection
      setEditedTax((prev) => ({
        ...prev,
        district: Array.from(new Set([...prev.district, ...selectedDistricts])),
      }));
    }
  };

  const handleSave = () => {
    saveChanges(index, editedTax);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTax(index);
  };

  // Get list of states for the selected country
  const states = editedTax.country
    ? State.getStatesOfCountry(editedTax.country)
    : [];

  // Remove a district from the district array
  const removeDistrict = (district) => {
    setEditedTax((prev) => ({
      ...prev,
      district: prev.district.filter((d) => d !== district),
    }));
  };

  return (
    <div className="border  p-4 rounded-lg shadow-sm w-full mb-3 gap-2 text-sm">
      <div className="grid grid-cols-2 md:grid-cols-5  border-b-2 pb-[1em] border-b-primary_color gap-2">
        {/* Country */}
        <div className="flex  flex-col w-full">
          <label className="text-sm text-gray-600">Country</label>
          <select
            value={editedTax.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className="border p-2 rounded"
            disabled={!isEditing}
          >
            <option value="">Select Country</option>
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State or district */}
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-600">State/District</label>
          <select
           
            onChange={(e) => {
              const selectedDistricts = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              handleDistrictChange(selectedDistricts);
            }}
            className="border p-2 rounded"
            disabled={!isEditing || !editedTax.country}
          >
            <option value="all">All States/Region</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tax name */}
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-600">Tax Name</label>
          <input
            type="text"
            value={editedTax.taxName}
            onChange={(e) => handleInputChange("taxName", e.target.value)}
            className="border p-2 rounded"
            disabled={!isEditing}
          />
        </div>

        {/* Percentage */}
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-600">Percentage</label>
          <input
            type="number"
            value={editedTax.percentage}
            onChange={(e) => handleInputChange("percentage", e.target.value)}
            className="border p-2 rounded"
            disabled={!isEditing}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full mt-2">
          {isEditing ? (
            <>
              <button
                onClick={isNew ? () => publishTax(index, editedTax) : handleSave}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                {isNew ? "Publish" : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {!isNew && (
                <>
                  <button
                    onClick={handleEdit}
                    className="bg-secondary_color text-text_color p-2 px-[2em] rounded hover:bg-opacity-80"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-primary_red text-text_color p-2  px-[2em] rounded hover:bg-opacity-80"
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Display selected districts with remove buttons */}
      <div className="mt-2 flex flex-wrap gap-2">
        {editedTax.district &&
          editedTax.district.map((district, i) => (
            <div
              key={i}
              className="flex p-2 rounded-sm bg-primary_color text-text_color items-center gap-2"
            >
              <span className="text-text_color">{district}</span>
              {isEditing && (
                <button
                  onClick={() => removeDistrict(district)}
                  className="bg-text_color text-primary_color w-[20px] h-[20px] flex items-center justify-center rounded-full p-2"
                >
                  x
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

const Taxes = () => {
  const [taxes, setTaxes] = useState([]);
  const [newTaxes, setNewTaxes] = useState([]);

  // Fetch all taxes
  const fetchTaxes = async () => {
    try {
      const response = await axios.get(`${server}/taxes/get-taxes`);
      setTaxes(response.data.taxes);
    } catch (error) {
      toast.error("Failed to fetch taxes: " + error.message);
    }
  };

  // Add a new tax to the newTaxes array
  const addNewTax = () => {
    setNewTaxes((prev) => [
      ...prev,
      { country: "", district: [], taxName: "", percentage: "" },
    ]);
  };

  // Handle input change for a specific new tax
  const handleChange = (index, field, value) => {
    setNewTaxes((prev) => {
      const updatedNewTaxes = [...prev];
      updatedNewTaxes[index][field] = value;
      return updatedNewTaxes;
    });
  };

  // Publish a new tax
  const publishTax = async (index, taxData) => {
    const tax = { ...taxData, percentage: parseFloat(taxData.percentage) };

    if (
      !tax.country ||
      !tax.taxName ||
      isNaN(tax.percentage) ||
      tax.district.length === 0
    ) {
      toast.error("Please fill all fields with valid data");
      return;
    }

    try {
      await axios.post(`${server}/taxes/create-tax`, tax);
      toast.success("Tax published successfully");
      setNewTaxes((prev) => prev.filter((_, i) => i !== index)); // Remove the specific new tax
      fetchTaxes(); // Refresh the list
    } catch (error) {
      toast.error("Failed to publish tax: " + error.message);
    }
  };

  // Save changes for an existing tax
  const saveChanges = async (index, taxData) => {
    const tax = { ...taxData };

    if (
      !tax.country ||
      !tax.taxName ||
      !tax.percentage ||
      tax.district.length === 0
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.put(`${server}/taxes/update-tax`, {
        _id: tax._id,
        ...tax,
      });
      toast.success("Tax updated successfully");
      fetchTaxes(); // Refresh the list
    } catch (error) {
      toast.error("Failed to update tax: " + error.message);
    }
  };

  // Delete an existing tax
  const deleteTax = async (index) => {
    try {
      const tax = taxes[index];
      await axios.delete(`${server}/taxes/delete-tax`, { data: { _id: tax._id } });
      toast.success("Tax deleted successfully");
      fetchTaxes(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete tax: " + error.message);
    }
  };

  // Cancel edit for existing taxes
  const cancelEdit = (index) => {
    const updatedTaxes = [...taxes];
    updatedTaxes[index] = { ...taxes[index] }; // Reset to original data
    setTaxes(updatedTaxes);
  };

  // Cancel new tax (remove it from the newTaxes array)
  const cancelNewTax = (index) => {
    setNewTaxes((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchTaxes();
  }, []);

  return (
    <div className="mt-10 flex  flex-col gap-[2em] text-sm">
      <div className="flex justify-between w-full">
        <h2 className="font-bold">Taxes</h2>
        <button
          onClick={addNewTax}
          className="primary_button py-0 h-max-h-[50px]"
        >
          Add New Tax
        </button>
      </div>

      {/* List of existing taxes */}
      {taxes.map((tax, index) => (
        <SingleTax
          key={tax._id}
          tax={tax}
          index={index}
          handleChange={handleChange}
          publishTax={publishTax}
          deleteTax={deleteTax}
          isNew={false}
          cancelEdit={cancelEdit}
          cancelNewTax={cancelNewTax}
          saveChanges={saveChanges}
        />
      ))}

      {/* List of new taxes */}
      {newTaxes.map((tax, index) => (
        <SingleTax
          key={`new-${index}`}
          tax={tax}
          index={index}
          handleChange={handleChange}
          publishTax={publishTax}
          deleteTax={deleteTax}
          isNew={true}
          cancelEdit={cancelEdit}
          cancelNewTax={cancelNewTax}
          saveChanges={saveChanges}
        />
      ))}
    </div>
  );
};

export default Taxes;