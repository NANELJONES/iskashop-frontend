import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../server";

const SingleWeight = ({
  variant,
  index,
  handleChange,
  publishVariant,
  deleteVariant,
  weightCompany,
  isNew,
  cancelEdit,
  saveChanges, // Add saveChanges function
}) => {
  const [isEditing, setIsEditing] = useState(isNew);
  const [editedVariant, setEditedVariant] = useState({ ...variant });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    cancelEdit(index, isNew); // Pass isNew to cancelEdit
  };

  const handleInputChange = (field, value) => {
    setEditedVariant({ ...editedVariant, [field]: value });
  };

  const handleSave = () => {
    saveChanges(index, editedVariant); // Save changes for the variant
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteVariant(index); // Delete the variant
  };

  // Reset editedVariant to original data when canceling edits for existing variants
  useEffect(() => {
    if (!isEditing && !isNew) {
      setEditedVariant({ ...variant });
    }
  }, [isEditing, isNew, variant]);

  return (
    <div className="border p-4 rounded-lg shadow-sm w-full flex-wrap lg:flex-nowrap bg-white mb-3 flex gap-2 text-sm">
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600">Delivery Company</label>
        <input type="text" value={weightCompany} disabled className="border p-2 rounded bg-gray-100" />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600">Weight Variant Name</label>
        <input
          type="text"
          value={editedVariant.weightVariant_name}
          onChange={(e) => handleInputChange("weightVariant_name", e.target.value)}
          className="border p-2 rounded"
          disabled={!isEditing}
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600">Min Weight (kg)</label>
        <input
          type="number"
          value={editedVariant.min_weight}
          onChange={(e) => handleInputChange("min_weight", e.target.value)}
          className="border p-2 rounded"
          disabled={!isEditing}
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600">Max Weight (kg)</label>
        <input
          type="number"
          value={editedVariant.max_weight}
          onChange={(e) => handleInputChange("max_weight", e.target.value)}
          className="border p-2 rounded"
          disabled={!isEditing}
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-600">Price (GHS)</label>
        <input
          type="number"
          value={editedVariant.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          className="border p-2 rounded"
          disabled={!isEditing}
        />
      </div>
      <div className="flex gap-2 w-full mt-2">
        {isEditing ? (
          <>
            <button onClick={isNew ? () => publishVariant(index, editedVariant) : handleSave} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
              {isNew ? "Publish" : "Save"}
            </button>
            <button onClick={handleCancel} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
              Cancel
            </button>
          </>
        ) : (
          <>
            {!isNew && ( // Only show Edit and Delete buttons for existing variants
              <>
                <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  Edit
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const WeightVariation = ({ weightCompany }) => {
  const [variants, setVariants] = useState([]);
  const [newVariant, setNewVariant] = useState([]);

  const fetchVariants = async () => {
    try {
      const response = await axios.get(`${server}/weightVariation/get-all-variants`, {
        params: { deliveryCompany: weightCompany },
      });
      setVariants(response.data.weightVariations);
    } catch (err) {
      toast.error("Could not fetch variants: " + err.message);
    }
  };

  useEffect(() => {
    if (!weightCompany) {
      return;
    } else {
      console.log("Fetching all the variants of", weightCompany);
      fetchVariants();
    }
  }, [weightCompany]);

  const addNewVariant = () => {
    setNewVariant([...newVariant, { deliveryCompany: weightCompany, min_weight: "", max_weight: "", weightVariant_name: "", price: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedList = [...newVariant];
    updatedList[index][field] = value;
    setNewVariant(updatedList);
  };

  const publishVariant = async (index, variantData) => {
    const variant = { ...variantData };

    variant.min_weight = Number(variant.min_weight);
    variant.max_weight = Number(variant.max_weight);
    variant.price = Number(variant.price);

    if (
      variant.min_weight === null || variant.min_weight === undefined ||
      variant.max_weight === null || variant.max_weight === undefined ||
      variant.price === null || variant.price === undefined ||
      !variant.weightVariant_name
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${server}/weightVariation/create-new-variant`, variant);
      toast.success("Variant published successfully");
      setNewVariant(newVariant.filter((_, i) => i !== index));
      fetchVariants();
    } catch (error) {
      toast.error("Failed to publish variant: " + error.message);
    }
  };

  const saveChanges = async (index, variantData) => {
    const variant = { ...variantData };

    // Validate fields
    if (
      variant.min_weight === null || variant.min_weight === undefined ||
      variant.max_weight === null || variant.max_weight === undefined ||
      variant.price === null || variant.price === undefined ||
      !variant.weightVariant_name
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // Call the backend to update the variant
      const response = await axios.put(`${server}/weightVariation/edit-variant`, {
        id: variant._id, // Pass the variant ID
        ...variant, // Pass the updated fields
      });
      toast.success("Variant updated successfully");
      fetchVariants(); // Refresh the list
    } catch (error) {
      toast.error("Failed to update variant: " + error.message);
    }
  };

  const deleteVariant = async (index) => {
    try {
      const variant = variants[index];
      // Call the backend to delete the variant
      await axios.delete(`${server}/weightVariation/delete-variant`, {
        data: { id: variant._id }, // Pass the variant ID
      });
      toast.success("Variant deleted successfully");
      fetchVariants(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete variant: " + error.message);
    }
  };

  const cancelEdit = (index, isNew) => {
    if (isNew) {
      // Remove the new variant from the newVariant array
      setNewVariant(newVariant.filter((_, i) => i !== index));
    } else {
      // For existing variants, reset the edited fields to their original data
      const updatedVariants = [...variants];
      updatedVariants[index] = { ...variants[index] }; // Reset to original data
      setVariants(updatedVariants);
    }
  };

  return (
    <div className="mt-10 flex flex-wrap text-sm">
      <div className="flex justify-between w-full">
        <h2 className="font-bold">Weights Variations for {weightCompany}</h2>
        <button onClick={addNewVariant} className="primary_button py-0 h-max-h-[50px]">New Weight Variation</button>
      </div>

      {variants.map((variant, index) => (
        <SingleWeight
          key={variant._id}
          variant={variant}
          index={index}
          handleChange={handleChange}
          publishVariant={publishVariant}
          deleteVariant={deleteVariant}
          weightCompany={weightCompany}
          isNew={false}
          cancelEdit={cancelEdit}
          saveChanges={saveChanges} // Pass saveChanges function
        />
      ))}

      {newVariant.map((variant, index) => (
        <SingleWeight
          key={index}
          variant={variant}
          index={index}
          handleChange={handleChange}
          publishVariant={publishVariant}
          deleteVariant={deleteVariant}
          weightCompany={weightCompany}
          isNew={true}
          cancelEdit={cancelEdit}
          saveChanges={saveChanges} // Pass saveChanges function (not used for new variants)
        />
      ))}
    </div>
  );
};

export default WeightVariation;