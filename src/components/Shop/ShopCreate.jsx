import { React, useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";

const ShopCreate = () => {
  const [step, setStep] = useState(1);
  
  // Step 1 - Basic Information
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  // Step 2 - Address & Industry
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [additionalAddress, setAdditionalAddress] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  
  // Step 3 - Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const industries = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Health & Beauty",
    "Automotive",
    "Toys & Games",
    "Food & Beverage",
    "Art & Crafts"
  ];

  // Update states when country changes
  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedCountry]);

  const handleIndustrySelect = (e) => {
    const industry = e.target.value;
    if (industry && !selectedIndustries.includes(industry)) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const removeIndustry = (industryToRemove) => {
    setSelectedIndustries(selectedIndustries.filter(industry => industry !== industryToRemove));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!shopName || !email || !phoneNumber) {
        toast.error("Please fill all fields");
        return;
      }
    } else if (step === 2) {
      if (!selectedCountry || !selectedState || !selectedCity || selectedIndustries.length === 0) {
        toast.error("Please fill all required fields");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Create form data object
    const formData = {
      name: shopName,
      email,
      password,
      phoneNumber,
      address: {
        country: selectedCountry?.isoCode || "",
        state: selectedState?.name || "",
        city: selectedCity,
        additionalAddress
      },
      industries: selectedIndustries
    };

    // Console log all fields
    console.log("Form Submission Data:", formData);

    // Commented out shop creation API call

    axios
      .post(`${server}/shop/create-shop`, formData)
      .then((res) => {
        toast.success(res.data.message);
        // Reset all form fields
        setShopName("");
        setEmail("");
        setPhoneNumber("");
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
        setAdditionalAddress("");
        setSelectedIndustries([]);
        setPassword("");
        setConfirmPassword("");
        setStep(1);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });


    // For testing - show success message
    toast.success("Form submitted successfully (Test Mode)");
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
          Business Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="shopName"
            required
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="mt-1">
          <input
            type="tel"
            name="phoneNumber"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="mt-1">
            <select
              name="country"
              required
              value={selectedCountry ? selectedCountry.isoCode : ""}
              onChange={(e) => setSelectedCountry(Country.getCountryByCode(e.target.value))}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <div className="mt-1">
            <select
              name="state"
              required
              value={selectedState ? selectedState.isoCode : ""}
              onChange={(e) => setSelectedState(State.getStateByCodeAndCountry(e.target.value, selectedCountry.isoCode))}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="city"
              required
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={!selectedState}
              placeholder="Enter your city"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="additionalAddress" className="block text-sm font-medium text-gray-700">
          Additional Address Information
        </label>
        <div className="mt-1">
          <textarea
            name="additionalAddress"
            value={additionalAddress}
            onChange={(e) => setAdditionalAddress(e.target.value)}
            rows={3}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Industries
        </label>
        <select
          onChange={handleIndustrySelect}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select an industry</option>
          {industries.map((industry) => (
            <option 
              key={industry} 
              value={industry}
              disabled={selectedIndustries.includes(industry)}
            >
              {industry}
            </option>
          ))}
        </select>

        <div className="mt-3 flex flex-wrap gap-2">
          {selectedIndustries.map((industry) => (
            <div
              key={industry}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
            >
              {industry}
              <button
                type="button"
                onClick={() => removeIndustry(industry)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <RxCross2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            type={visible ? "text" : "password"}
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {visible ? (
            <AiOutlineEye
              className="absolute right-2 top-2 cursor-pointer"
              size={25}
              onClick={() => setVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-2 top-2 cursor-pointer"
              size={25}
              onClick={() => setVisible(true)}
            />
          )}
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Re-enter Password
        </label>
        <div className="mt-1 relative">
          <input
            type={visibleConfirm ? "text" : "password"}
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {visibleConfirm ? (
            <AiOutlineEye
              className="absolute right-2 top-2 cursor-pointer"
              size={25}
              onClick={() => setVisibleConfirm(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-2 top-2 cursor-pointer"
              size={25}
              onClick={() => setVisibleConfirm(true)}
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="mt-2 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center min-w-[100px]">
          <div className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-secondary_color' : 'bg-primary_color'}`} />
          <span className={`mt-2 text-sm whitespace-nowrap ${
            step === 1 
              ? 'text-blue-600 font-bold' 
              : step > 1 
                ? 'text-gray-500 font-medium' 
                : 'text-gray-500 font-light'
          }`}>
            Basic Info
          </span>
        </div>

        <div className="h-[2px] bg-primary_color flex-1 mx-2" />

        <div className="flex flex-col items-center min-w-[100px]">
          <div className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-secondary_color' : 'bg-primary_color'}`} />
          <span className={`mt-2 text-sm whitespace-nowrap ${
            step === 2 
              ? 'text-blue-600 font-bold' 
              : step > 2 
                ? 'text-gray-500 font-medium' 
                : 'text-gray-500 font-light'
          }`}>
            2.Address
          </span>
        </div>

        <div className="h-[2px] bg-primary_color flex-1 mx-2" />

        <div className="flex flex-col items-center min-w-[100px]">
          <div className={`h-2 w-2 rounded-full ${step >= 3 ? 'bg-secondary_color' : 'bg-primary_color'}`} />
          <span className={`mt-2 text-sm whitespace-nowrap ${
            step === 3 
              ? 'text-blue-600 font-bold' 
              : step > 3 
                ? 'text-gray-500 font-medium' 
                : 'text-gray-500 font-light'
          }`}>
            3.Password
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a seller
        </h2>
        {renderStepIndicator()}
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              )}
            </div>
          </form>

          <div className={`${styles.noramlFlex} w-full mt-4`}>
            <h4>Already have an account?</h4>
            <Link to="/shop-login" className="text-blue-600 pl-2">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
