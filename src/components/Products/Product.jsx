import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AccountReview from "../Shop/AccountReview";
import { server } from "../../server";

import axios from "axios";
// Dummy data
const dummyCategories = [
  { "_id": "65f1a1b2c3d4e5f6a7b80101", "name": "Electronics" },
  { "_id": "65f1a1b2c3d4e5f6a7b80102", "name": "Automobiles" },
  { "_id": "65f1a1b2c3d4e5f6a7b80103", "name": "Fashion" },
  { "_id": "65f1a1b2c3d4e5f6a7b80104", "name": "Home & Garden" },
  { "_id": "65f1a1b2c3d4e5f6a7b80105", "name": "Sports" },
  { "_id": "65f1a1b2c3d4e5f6a7b80106", "name": "Books" }
];

const dummySubcategories = [
  // Electronics subcategories
  { "_id": "65f1a1b2c3d4e5f6a7b80201", "name": "Phones", "category": "65f1a1b2c3d4e5f6a7b80101" },
  { "_id": "65f1a1b2c3d4e5f6a7b80202", "name": "Laptops", "category": "65f1a1b2c3d4e5f6a7b80101" },
  { "_id": "65f1a1b2c3d4e5f6a7b80203", "name": "Tablets", "category": "65f1a1b2c3d4e5f6a7b80101" },
  { "_id": "65f1a1b2c3d4e5f6a7b80204", "name": "Smartwatches", "category": "65f1a1b2c3d4e5f6a7b80101" },
  
  // Automobiles subcategories
  { "_id": "65f1a1b2c3d4e5f6a7b80205", "name": "Cars", "category": "65f1a1b2c3d4e5f6a7b80102" },
  { "_id": "65f1a1b2c3d4e5f6a7b80206", "name": "Motorcycles", "category": "65f1a1b2c3d4e5f6a7b80102" },
  { "_id": "65f1a1b2c3d4e5f6a7b80207", "name": "SUVs", "category": "65f1a1b2c3d4e5f6a7b80102" },
  { "_id": "65f1a1b2c3d4e5f6a7b80208", "name": "Trucks", "category": "65f1a1b2c3d4e5f6a7b80102" }
];

const dummyMakes = [
  // Electronics manufacturers
  { "_id": "65f1a1b2c3d4e5f6a7b80301", "name": "Apple", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80201" },
  { "_id": "65f1a1b2c3d4e5f6a7b80302", "name": "Samsung", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80201" },
  { "_id": "65f1a1b2c3d4e5f6a7b80303", "name": "Dell", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80202" },
  { "_id": "65f1a1b2c3d4e5f6a7b80304", "name": "HP", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80202" },
  
  // Automobiles manufacturers
  { "_id": "65f1a1b2c3d4e5f6a7b80305", "name": "Toyota", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205" },
  { "_id": "65f1a1b2c3d4e5f6a7b80306", "name": "Honda", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205" },
  { "_id": "65f1a1b2c3d4e5f6a7b80307", "name": "BMW", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205" },
  { "_id": "65f1a1b2c3d4e5f6a7b80308", "name": "Mercedes", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205" }
];

const dummyBrands = [
  // Electronics brands
  { "_id": "65f1a1b2c3d4e5f6a7b80401", "name": "iPhone", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80201", "make": "65f1a1b2c3d4e5f6a7b80301" },
  { "_id": "65f1a1b2c3d4e5f6a7b80402", "name": "Galaxy", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80201", "make": "65f1a1b2c3d4e5f6a7b80302" },
  { "_id": "65f1a1b2c3d4e5f6a7b80403", "name": "Latitude", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80202", "make": "65f1a1b2c3d4e5f6a7b80303" },
  { "_id": "65f1a1b2c3d4e5f6a7b80404", "name": "Pavilion", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80202", "make": "65f1a1b2c3d4e5f6a7b80304" },
  
  // Automobiles brands
  { "_id": "65f1a1b2c3d4e5f6a7b80405", "name": "Corolla", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205", "make": "65f1a1b2c3d4e5f6a7b80305" },
  { "_id": "65f1a1b2c3d4e5f6a7b80406", "name": "Civic", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205", "make": "65f1a1b2c3d4e5f6a7b80306" },
  { "_id": "65f1a1b2c3d4e5f6a7b80407", "name": "3 Series", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205", "make": "65f1a1b2c3d4e5f6a7b80307" },
  { "_id": "65f1a1b2c3d4e5f6a7b80408", "name": "C-Class", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205", "make": "65f1a1b2c3d4e5f6a7b80308" }
];

const dummyModels = [
  // Electronics models
  { "_id": "65f1a1b2c3d4e5f6a7b80501", "name": "iPhone 15", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80201", "brand": "65f1a1b2c3d4e5f6a7b80401" },
  { "_id": "65f1a1b2c3d4e5f6a7b80502", "name": "Galaxy S24", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80201", "brand": "65f1a1b2c3d4e5f6a7b80402" },
  { "_id": "65f1a1b2c3d4e5f6a7b80503", "name": "Latitude 7430", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80202", "brand": "65f1a1b2c3d4e5f6a7b80403" },
  { "_id": "65f1a1b2c3d4e5f6a7b80504", "name": "Pavilion 15", "category": "65f1a1b2c3d4e5f6a7b80101", "subcategory": "65f1a1b2c3d4e5f6a7b80202", "brand": "65f1a1b2c3d4e5f6a7b80404" },
  
  // Automobiles models
  { "_id": "65f1a1b2c3d4e5f6a7b80505", "name": "Corolla 2024", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205", "brand": "65f1a1b2c3d4e5f6a7b80405" },
  { "_id": "65f1a1b2c3d4e5f6a7b80506", "name": "Civic 2024", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205", "brand": "65f1a1b2c3d4e5f6a7b80406" },
  { "_id": "65f1a1b2c3d4e5f6a7b80507", "name": "330i 2024", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205", "brand": "65f1a1b2c3d4e5f6a7b80407" },
  { "_id": "65f1a1b2c3d4e5f6a7b80508", "name": "C300 2024", "category": "65f1a1b2c3d4e5f6a7b80102", "subcategory": "65f1a1b2c3d4e5f6a7b80205", "brand": "65f1a1b2c3d4e5f6a7b80408" }
];

const Product = ({id}) => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add a state to track if initial data is loaded
  const [isInitialized, setIsInitialized] = useState(false);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [subCategory, setSubCategory] = useState("");
  const [make, setMake] = useState("");
  const [brand, setBrand] = useState("");
  const [dimensions, setDimensions] = useState({
    length: "",
    breadth: "",
    height: "",
  });
  const [color, setColor] = useState("");
  const [safetyPolicy, setSafetyPolicy] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [taxes, setTaxes] = useState("No Taxes");
  const [warranty, setWarranty] = useState("");
  const [weight, setWeight] = useState("");

  // Add new state variables for the data
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [makes, setMakes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  // Add state variables for filtered options
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [filteredMakes, setFilteredMakes] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [loading, setLoading] = useState(true);
  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
      ['link']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'color', 'background',
    'link'
  ];

  // Modify the initialization useEffect
  useEffect(() => {
    // Set the dummy data
    setCategories(dummyCategories);
    setSubcategories(dummySubcategories);
    setMakes(dummyMakes);
    setBrands(dummyBrands);
    setModels(dummyModels);
    
    // Mark as initialized
    setIsInitialized(true);
    setLoading(false);
  }, []);

  //Product data fetch effect
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
  
      try {
        const { data } = await axios.get(`${server}/product/get-product-details/${id}`);
  
        if (data.product) {
          const product = data.product;
          console.log("Fetched Product:", product);
          
          // Set category first
          setCategory(product?.category || "");
          
          // Filter subcategories based on category
          const relevantSubcategories = dummySubcategories.filter(
            sub => sub.category === product?.category
          );
          setFilteredSubcategories(relevantSubcategories);
          
          // Set subcategory
          setSubCategory(product?.subCategory || "");
          
          // Filter makes based on subcategory
          const relevantMakes = dummyMakes.filter(
            make => make.subcategory === product?.subCategory
          );
          setFilteredMakes(relevantMakes);
          
          // Set make
          setMake(product?.make || "");
          
          // Filter brands based on make
          const relevantBrands = dummyBrands.filter(
            brand => brand.make === product?.make
          );
          setFilteredBrands(relevantBrands);
          
          // Set remaining fields
          setBrand(product?.brand || "");
          setName(product?.name || "");
          setDescription(product?.description || "");
          setTags(product?.tags || "");
          setOriginalPrice(product?.originalPrice || "");
          setDiscountPrice(product?.discountPrice || "");
          setStock(product?.stock || "");
          setDimensions(product?.dimensions || { length: "", breadth: "", height: "" });
          setColor(product?.color || "");
          setSafetyPolicy(product?.safetyPolicy || "");
          setRefundPolicy(product?.refundPolicy || "");
          setTaxes(product?.taxes || "No Taxes");
          setWarranty(product?.warranty || "");
          setWeight(product?.weight !== undefined ? Number(product.weight) : '');
          setImages(product?.images?.map(img => img.url) || []);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
    //   window.location.reload();
    }
  }, [error, success, navigate]);

  // Update the filtering useEffects
  useEffect(() => {
    if (category) {
      const filtered = dummySubcategories.filter(sub => sub.category === category);
      setFilteredSubcategories(filtered);
      setSubCategory("");
      setMake("");
      setBrand("");
    }
  }, [category]);

  useEffect(() => {
    if (subCategory) {
      const filtered = dummyMakes.filter(make => make.subcategory === subCategory);
      setFilteredMakes(filtered);
      setMake("");
      setBrand("");
    }
  }, [subCategory]);

  useEffect(() => {
    if (make) {
      const filtered = dummyBrands.filter(brand => brand.make === make);
      setFilteredBrands(filtered);
      setBrand("");
    }
  }, [make]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };




  const tester = (e) => {
    e.preventDefault();
    console.log(weight);
    toast.success("Tester");
  } 

  const handleSubmit = async() => {
    
    const newForm = new FormData();
  
    toast.success("Handling the submit");
  
  //  Append each image individually
    images.forEach((image) => {
      newForm.append("images", image);
    });
  
    // Required fields
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("subCategory", subCategory);
    newForm.append("make", make);
    newForm.append("brand", brand);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
  
    // Optional fields - ensure they're not undefined/null before appending
    if (originalPrice) newForm.append("originalPrice", originalPrice);
    if (tags) newForm.append("tags", tags);
    if (color) newForm.append("color", color);
    if (safetyPolicy) newForm.append("safetyPolicy", safetyPolicy);
    if (refundPolicy) newForm.append("refundPolicy", refundPolicy);
    if (taxes) newForm.append("taxes", taxes);
    if (warranty) newForm.append("warranty", warranty);
    if (weight || weight === 0) {
      const parsedWeight = Number(weight);
      if (!isNaN(parsedWeight)) {
        newForm.append("weight", parsedWeight);
      }
    }
  
    // Only append dimensions if at least one value exists
    const hasDimensions = dimensions.length || dimensions.breadth || dimensions.height;
    if (hasDimensions) {
      newForm.append("dimensions", JSON.stringify(dimensions));
    }
  



    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'token': localStorage.getItem('token'),
        },
      };  
  
      const { data } = await axios.put(
        `${server}/product/update-product/${id}`,
        newForm,
        config
      );

      if(data.success){
        toast.success("Product updated successfully!");
        window.location.reload();
      }else{
        toast.error("Failed to update product!");
      }

    // dispatch(updateProduct(id, newForm));
 


 
  };


  // Only show loading when actually loading
  if (loading && !isInitialized) {
    return <div>Loading product data...</div>;
  }

  // Don't show the loading message for seller, just render without the seller-specific content
  if (!seller) {
  return (
        <div className="w-[95%] mx-auto bg-white rounded-[4px] py-8">
        <h2 className="font-Poppins font-semibold mb-8 text-primary_color">Product Details</h2>
        {/* Render the form without seller-specific features */}
        {/* ... rest of your form ... */}
        </div>
  );

  }

//   // Debug what's being rendered
//   console.log("Rendering with data:", {
//     name,
//     category,
//     subCategory,
//     make,
//     brand,
//     seller
//   });

  return (
    <div className="w-[95%] mx-auto bg-white rounded-[4px] py-8">
        <h2 className="font-Poppins  font-semibold  text-primary_color">Product Details</h2>
      

{/* <button className="bg-primary_color text-text_color px-8 py-3 rounded-md hover:bg-primary_color/80 transition-colors text-sm font-medium" onClick={tester}>Tester</button> */}
 
 
      {seller?.adminData?.shopApproval === "Pending" && (
        <AccountReview message="Create Product" img_path="/account_review.svg" />
      )}

      {seller?.adminData?.shopApproval === "Rejected" && (
        <h4 className="text-center text-red-500">
          Your Account is Rejected by IskaShop. Please contact support for more information.
        </h4>
      )}

      {seller?.adminData?.shopApproval === "Approved" && (
        <div className="w-[95%] mx-auto bg-white rounded-[4px] py-8">
       


          <form  className="space-y-8">
           
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">


                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-4 text-primary_color">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setSubCategory("");
                          setMake("");
                          setBrand("");
                        }}
                      >
                        <option value="">Choose a category</option>
                        {categories.map((cat) => (
                          <option value={cat._id} key={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Sub Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={subCategory}
                        onChange={(e) => {
                          setSubCategory(e.target.value);
                          setMake("");
                          setBrand("");
                        }}
                      >
                        <option value="">Choose a sub-category</option>
                        {filteredSubcategories.map((sub) => (
                          <option value={sub._id} key={sub._id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Manufacturer/Make
                      </label>
                      <select
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                      >
                        <option value="">Choose a manufacturer</option>
                        {filteredMakes.map((m) => (
                          <option 
                            value={m._id} 
                            key={m._id}
                            selected={m._id === make}
                          >
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Brand <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        <option value="">Choose a brand</option>
                        {filteredBrands.map((b) => (
                          <option value={b._id} key={b._id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-4 text-primary_color">Pricing & Stock</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Original Price
                      </label>
                      <input
                        type="number"
                        value={originalPrice}
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="Enter original price..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Final / Discounted Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={discountPrice}
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        placeholder="Enter discounted price..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={stock}
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Enter stock quantity..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-[550px]">
                  <h3 className="text-lg font-medium mb-4 text-primary_color">
                    Description <span className="text-red-500">*</span>
                  </h3>
                  <div className="h-[450px]">
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      modules={modules}
                      formats={formats}
                      placeholder="Enter product description..."
                      className="bg-white h-[400px]"
                      style={{ height: '400px' }}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-4 text-primary_color">Product Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Dimensions
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="number"
                          value={dimensions.length}
                          className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                          placeholder="Length"
                        />
                        <input
                          type="number"
                          value={dimensions.breadth}
                          className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => setDimensions({ ...dimensions, breadth: e.target.value })}
                          placeholder="Breadth"
                        />
                        <input
                          type="number"
                          value={dimensions.height}
                          className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                          placeholder="Height"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Color
                      </label>
                      <input
                        type="text"
                        value={color}
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="Enter color..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary_color mb-1">
                        Weight (in kg) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={weight === '' ? '' : Number(weight).toString()}
                        min="0"
                        step="0.01"
                        className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || value === '0.') {
                            setWeight(value);
                          } else {
                            const numValue = Number(value);
                            setWeight(isNaN(numValue) ? '' : numValue);
                          }
                        }}
                        placeholder="Enter weight..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-8">
              <h3 className="text-lg font-medium mb-4 text-primary_color">
                Product Images <span className="text-red-500">*</span>
              </h3>
              <div className="w-full">
                <input
                  type="file"
                  id="upload"
                  name="upload"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  required
                />
                <label
                  htmlFor="upload"
                  className="w-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="text-center">
                    <i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
                    <p className="text-gray-500 mt-2">Click or drag images to upload</p>
                    <p className="text-sm text-gray-400 mt-1">(Required)</p>
                  </div>
                </label>
                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`product-${index}`}
                          className="w-full h-[120px] object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label 
                            className="cursor-pointer bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                            title="Replace Image"
                          >
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    if (reader.readyState === 2) {
                                      const newImages = [...images];
                                      newImages[index] = reader.result;
                                      setImages(newImages);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <i className="fas fa-sync-alt text-sm"></i>
                          </label>
                          
                          <button
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                            onClick={() => {
                              const newImages = images.filter((_, i) => i !== index);
                              setImages(newImages);
                            }}
                            title="Remove Image"
                          >
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4 text-primary_color">Policies & Additional Info</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary_color mb-1">
                    Safety Policy
                  </label>
                  <textarea
                    value={safetyPolicy}
                    className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                    onChange={(e) => setSafetyPolicy(e.target.value)}
                    placeholder="Enter safety policy..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary_color mb-1">
                    Refund Policy
                  </label>
                  <textarea
                    value={refundPolicy}
                    className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                    onChange={(e) => setRefundPolicy(e.target.value)}
                    placeholder="Enter refund policy..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary_color mb-1">
                    Taxes
                  </label>
                  <select
                    value={taxes}
                    className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setTaxes(e.target.value)}
                  >
                    <option value="No Taxes">No Taxes</option>
                    <option value="Inclusive">Inclusive</option>
                    <option value="Exclusive">Exclusive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary_color mb-1">
                    Warranty Information
                  </label>
                  <input
                    type="text"
                    value={warranty}
                    className="w-full text-sm text-primary_color p-[1em] border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setWarranty(e.target.value)}
                    placeholder="Enter warranty information..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
              onClick={()=>{
                handleSubmit();
              }}
             
                className="bg-primary_color text-text_color px-8 py-3 rounded-md hover:bg-primary_color/80 transition-colors text-sm font-medium"
              >
                Update Product
              </button>


              
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Product;
