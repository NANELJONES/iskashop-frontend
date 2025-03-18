import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { server } from '../../server';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Country,State , City} from 'country-state-city';
import DeliveryCostVariation from './Deliveries/DeliveryCostVariation';
import WeightVariation from "./Deliveries/WeightVariation"
import AllDeliveries from './Deliveries/AllDeliveries';




// these are purely delivery companies and modals 
const DeliveryCompanyModal = ({
  companyDetails,
  handleInputChange,
  toggleModal,
  setCompanyDetails,
  activeCompany, // The company being edited (if any)
  isEditMode, // Whether the modal is in edit mode
  fetchAllCompanies,
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Load countries on component mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Load states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  // Handle country selection
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    handleInputChange("district", []);

    console.log("this is the selcted value ", e.target.value)
    setSelectedCountry(countryCode);
    handleInputChange("country", countryCode);
  };

  // Handle state selection (add to districts array)
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    if (!companyDetails.district.includes(stateName)) {
      const updatedDistricts = [...companyDetails.district, stateName];
      handleInputChange("district", updatedDistricts);
    }
  };

  // Remove a state from the districts array
  const removeState = (stateName) => {
    const updatedDistricts = companyDetails.district.filter(
      (state) => state !== stateName
    );
    handleInputChange("district", updatedDistricts);
  };

  const handleSubmit = async () => {
    console.log(companyDetails)
    if (!companyDetails.companyName) {
      toast.error("Company Name is required!");
      return;
    }

    try {
      let res;
      if (activeCompany) {
        // If activeCompany exists, update the company
        res = await axios.put(
          `${server}/deliveryCompany/update-company`,
          companyDetails
        );
      } else {
        // If activeCompany does not exist, create a new company
        res = await axios.post(
          `${server}/deliveryCompany/create-company`,
          companyDetails
        );
      }

      toast.success(res.data.message);
      setCompanyDetails({
        companyName: "",
        address: "",
        phoneNumber: "",
        email: "",
        country: "",
        district: [],
      });
      toggleModal(); // Close the modal after successful submission
      fetchAllCompanies();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    }



  };

  return (
    <div className="fixed inset-0 flex items-center py-[2em] justify-center bg-[rgba(0,0,0,0.7)] z-50">
      <div className="bg-text_color p-6 flex   max-h-[700px]  flex-col gap-4 rounded-md shadow-md w-full max-w-[400px] relative">
        <h2 className="font-semibold mb-3">
          {isEditMode ? "Edit Company" : "Add New Company"}
        </h2>

<div className='h-[70%]  overflow-y-scroll'> 
      <div className='flex flex-col gap-[0.1em]'>
            {/* Company Name Input */}
            <label htmlFor="companyName" className="text-sm font-medium">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id="companyName"
          className="w-full border text-sm rounded-md p-2 mb-4"
          placeholder="Enter company name"
          value={companyDetails.companyName}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
          required
        />
      </div>

     <div className='flex flex-col gap-[0.1em]'>
         {/* Location Input */}
         <label htmlFor="address" className="text-sm font-medium">
          Location
        </label>
        <input
          id="address"
          className="w-full border text-sm rounded-md p-2 mb-4"
          placeholder="Enter location"
          value={companyDetails.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
     </div>

<div className='flex flex-col gap-[0.1em]'>
          {/* Phone Number Input */}
          <label htmlFor="phoneNumber" className="text-sm font-medium">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          className="w-full border text-sm rounded-md p-2 mb-4"
          placeholder="Enter phone number"
          value={companyDetails.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
        />
</div>

        <div className='flex flex-col gap-[0.1em]'>
          {/* Email Input */}
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          className="w-full border text-sm rounded-md p-2 mb-4"
          placeholder="Enter email"
          value={companyDetails.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        </div>

      <div className='flex flex-col gap-[0.1em]'>
          {/* Country Dropdown */}
          <label htmlFor="country" className="text-sm font-medium">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          id="country"
          className="w-full border text-sm rounded-md p-2 mb-4"
          value={selectedCountry}
          onChange={handleCountryChange}
          required
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-[0.1em]'>
          {/* State Dropdown */}
          <label htmlFor="state" className="text-sm font-medium">
          State <span className="text-red-500">*</span>
        </label>
        <select
          id="state"
          className="w-full border text-sm rounded-md p-2 mb-4"
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

        {/* Selected States (Districts) */}
        <div className="flex flex-wrap text-sm gap-2 mb-4">
          {companyDetails.district.map((state) => (
            <div
              key={state}
              className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded"
            >
              <span>{state}</span>
              <button
                type="button"
                onClick={() => removeState(state)}
                className="text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
</div>

        <div className="flex justify-between">
          <button
            className="bg-blue-600 primary_button text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            {isEditMode ? "Update Company" : "Add New Delivery"}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={toggleModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


const AllCompanies = ({
  setAddService,
  setCompanyDetails,
  setActiveCompany,
  setIsEditMode,
  companies,
  fetchAllCompanies, // Pass the fetch function
}) => {
  const handleToggleActiveStatus = async (id, currentStatus) => {
    try {
      const response = await axios.put(
        `${server}/deliveryCompany/toggle-active-status`,
        { _id: id, activeStatus: !currentStatus } // Send _id and new activeStatus
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllCompanies(); // Refresh the list of companies
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    }
  };

  const handleDeleteCompany = async (id) => {
    try {
      const response = await axios.delete(
        `${server}/deliveryCompany/delete-company/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllCompanies(); // Refresh the list of companies
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    }
  };

  const handleSettingActive = (selected_Company) => {
    setActiveCompany(selected_Company);
    setCompanyDetails({
      companyName: selected_Company.companyName,
      address: selected_Company.address,
      phoneNumber: selected_Company.phoneNumber,
      email: selected_Company.email,
      country: selected_Company.country,
      district: selected_Company.district,
      _id: selected_Company._id,
    });
    setIsEditMode(true); // Set edit mode to true
    setAddService(true); // Open the modal
  };

  return (
    <>
      <h1 className="border-b border-b">All Companies</h1>

      {companies.map((each_company, index) => (
        <div key={index} className="flex items-center justify-between">
          <h4>{each_company.companyName}</h4>
          <div className="flex items-center gap-2">
            {/* Checkbox for activeStatus */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={each_company.activeStatus} // Reflect the current status
                onChange={() =>
                  handleToggleActiveStatus(each_company._id, each_company.activeStatus)
                }
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">
                {each_company.activeStatus ? "Active" : "Inactive"}
              </span>
            </label>
            <CiEdit
              className="text-[30px] text-primary_color cursor-pointer"
              onClick={() => handleSettingActive(each_company)}
            />
            {/* <MdDelete
              className="text-[30px] text-primary_color cursor-pointer"
              onClick={() => handleDeleteCompany(each_company._id)}
            /> */}
          </div>
        </div>
      ))}
    </>
  );
};


// this is the component that has All Company Names, the Cost Variation and the Weight Variation
const DeliveryCompanies = () => {
  const [companies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  const fetchAllCompanies = async () => {
    try {
      const allCompanies = await axios.get(`${server}/deliveryCompany/get-companies`);
      console.log(allCompanies);
      if (allCompanies) {
        setAllCompanies(allCompanies.data.companies);
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };



  function getCompanyNames(data) {
    return data.map(company => company.companyName);
}

  useEffect(() => {
    fetchAllCompanies();
  }, []);


  

  console.log("these are all the companies", companies )

  const [addService, setAddService] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    address: "",
    phoneNumber: "",
    email: "",
    activeStatus: true,
    country: "",
    district: [],
  });
  const [activeCompany, setActiveCompany] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode

  const toggleModal = () => {
    setAddService(!addService);
    if (!addService) {
      setActiveCompany(null); // Reset activeCompany when closing the modal
      setCompanyDetails({
        companyName: "",
        address: "",
        phoneNumber: "",
        email: "",
        country: "",
        district: [],
        activeStatus: true,
      });
      setIsEditMode(false); // Reset edit mode
    }
  };

  const handleInputChange = (field, value) => {
    setCompanyDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <div>
          <h4 className="text-">Delivery</h4>
          <h2 className="font-bold ">Services</h2>
        </div>
        <button
          className="primary_button text-white px-4 py-2 rounded-md"
          onClick={toggleModal}
        >
          Add New Service
        </button>
      </div>

      {/* Show modal only if addService is true */}
      {addService && (
        <DeliveryCompanyModal
          companyDetails={companyDetails}
          handleInputChange={handleInputChange}
          toggleModal={toggleModal}
          setCompanyDetails={setCompanyDetails}
          activeCompany={activeCompany} // Pass the active company
          isEditMode={isEditMode} // Pass the edit mode
          fetchAllCompanies={fetchAllCompanies}
        />
      )}

      <AllCompanies
        fetchAllCompanies={fetchAllCompanies}
        setAddService={setAddService}
        setCompanyDetails={setCompanyDetails}
        setActiveCompany={setActiveCompany}
        setIsEditMode={setIsEditMode} // Pass setIsEditMode to AllCompanies
        companies={companies}
      />
{
 loading &&
     <p>Loading...</p> // Show a loading indicator
  }

{companies.length > 0 && (
  <WeightVariation
    weightCompany={companies[0]?.companyName}
    all_Companies={getCompanyNames(companies)}
  />
)}
      <DeliveryCostVariation deliveryCompanies={companies}></DeliveryCostVariation>


    


    </div>
  );
};

// they end here 









const FullDeliveries = () => {

  
  const [active, setActive]  = useState(
    {
      TabName :"All Deliveries",
      TabValue: 1,
      Component: <AllDeliveries></AllDeliveries>
       
    })
  const Delivery_Tabs  = [

    {
      TabName :"All Deliveries",
      TabValue: 1,
      Component: <AllDeliveries></AllDeliveries>
       
    },
    {
      TabName :"Delivery Services",
      TabValue: 2,
      Component: <><DeliveryCompanies></DeliveryCompanies> 
       </>
    },
  

  ]


  
  const selectActive = (e, delivery_derivative)=>{
    e.preventDefault()
    setActive(delivery_derivative)
  }
  return (

    <div className='mt-[2em]'>
     
      <div className='flex gap-2'>
      {Delivery_Tabs.map((each_tab, index)=>{
        return <button className={`${active.TabValue === each_tab.TabValue ? "bg-primary_color  text-text_color" :"bg-none border border-primary_color text-primary_color"}`} key={index} 
        onClick={(e)=>{
selectActive(e, each_tab)
        }}
        > {each_tab.TabName} </button>
      })}
      </div>

     
<div className='mt-4'>

  {active.Component}
</div>




      


   
    
       
    </div>
  )
}

export default FullDeliveries
