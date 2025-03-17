import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera, AiOutlineClose } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import { categoriesData } from "../../static/data";
import { Link } from "react-router-dom";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);

  // Business Info State
  const [businessName, setBusinessName] = useState(seller?.businessInfo?.businessName || "");
  const [ownerFirstName, setOwnerFirstName] = useState(seller?.businessInfo?.ownerFirstName || "");
  const [ownerLastName, setOwnerLastName] = useState(seller?.businessInfo?.ownerLastName || "");
  const [industry, setIndustry] = useState(seller?.businessInfo?.industry || []);
  const [description, setDescription] = useState(seller?.businessInfo?.description || "");
  const [customerSupport, setCustomerSupport] = useState(seller?.businessInfo?.customerSupport || "");
  const [businessLogo, setBusinessLogo] = useState(seller?.businessInfo?.businessLogo?.url || "");
  const [businessBanner, setBusinessBanner] = useState(seller?.businessInfo?.businessBanner?.url || "");
  const [email, setEmail] = useState(seller?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.businessInfo?.phoneNumber || "");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState(seller?.businessDetails?.businessRegistrationNumber || "");

  // Address State
  const [country, setCountry] = useState(seller?.address?.country || "");
  const [district, setDistrict] = useState(seller?.address?.districts || "");
  const [city, setCity] = useState(seller?.address?.city || "");
  const [additionalInformation, setAdditionalInformation] = useState(seller?.address?.additionalInformation || "");
  const [proofOfAddress, setProofOfAddress] = useState(seller?.address?.proofOfAddress?.url || "");

  // Certification State
  const [registeredBusinessName, setRegisteredBusinessName] = useState(seller?.businessDetails?.registeredBusinessName || "");
  const [businessType, setBusinessType] = useState(seller?.businessDetails?.businessType || "");
  const [certificateOfIncorporation, setCertificateOfIncorporation] = useState(seller?.businessDetails?.certificateOfIncorporation?.url || "");
  const [taxRegistrationCertificate, setTaxRegistrationCertificate] = useState(seller?.businessDetails?.taxRegistrationCertificate?.url || "");
  const [complianceCertificate, setComplianceCertificate] = useState(seller?.businessDetails?.complianceCertificate?.url || "");

  // Remittance State (left blank for now)
  const handleAddNewAccount = () => {
    toast.info("Add New Account functionality will be implemented soon.");
  };

  const dispatch = useDispatch();

  // Add state options based on selected country
  const states = State.getStatesOfCountry(country);

  // File validation function
  const validateFile = (file, type) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (!validTypes.includes(file.type)) {
      toast.error(`${type} must be a PDF or DOC file`);
      return false;
    }

    if (file.size > maxSize) {
      toast.error(`${type} must be less than 10MB`);
      return false;
    }

    return true;
  };

  // Modified handleImage function with validation
  const handleImage = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        const base64 = reader.result; // Base64 string
        switch (type) {
          case "businessLogo":
            setBusinessLogo(base64);
            break;
          case "businessBanner":
            setBusinessBanner(base64);
            break;
          case "proofOfAddress":
            setProofOfAddress(base64);
            break;
          case "certificateOfIncorporation":
            setCertificateOfIncorporation(base64);
            break;
          case "taxRegistrationCertificate":
            setTaxRegistrationCertificate(base64);
            break;
          case "complianceCertificate":
            setComplianceCertificate(base64);
            break;
          default:
            break;
        }
      }
    };
    reader.readAsDataURL(file); // Convert file to Base64
  };
  // Handle file removal
  const handleRemoveFile = (type) => {
    switch(type) {
      case "proofOfAddress":
        setProofOfAddress("");
        break;
      case "certificateOfIncorporation":
        setCertificateOfIncorporation("");
        break;
      case "taxRegistrationCertificate":
        setTaxRegistrationCertificate("");
        break;
      case "complianceCertificate":
        setComplianceCertificate("");
        break;
    }
  };

  // File input component
  const FileInput = ({ label, type, value, accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" }) => (
    <div>
      <label className="block pb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          className={`${styles.input} cursor-not-allowed pr-24`}
          value={value ? value.name || value : "No file chosen"}
          readOnly
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          {value && (
            <button
              onClick={() => handleRemoveFile(type)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
              type="button"
            >
              <AiOutlineClose size={16} />
            </button>
          )}
          <label
            htmlFor={type}
            className="bg-primary_color text-text_color text-white px-4 py-2 text-sm cursor-pointer"
          >
            Choose File
          </label>
        </div>
        <input
          type="file"
          id={type}
          className="hidden"
          accept={accept}
          onChange={(e) => handleImage(e, type)}
        />
      </div>
      <span className="text-xs text-gray-500 mt-1">
        Maximum file size: 10MB. Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG, WEBP
      </span>
    </div>
  );

  // Handle industry selection
  const handleIndustrySelect = (selectedIndustry) => {
    if (!industry.includes(selectedIndustry)) {
      setIndustry([...industry, selectedIndustry]);
    }
  };

  // Handle industry removal
  const handleRemoveIndustry = (industryToRemove) => {
    setIndustry(industry.filter(ind => ind !== industryToRemove));
  };

  // Modified updateHandler
  const updateHandler = async (e) => {
    e.preventDefault();
  
    const formData = {
      businessInfo: JSON.stringify({
        businessName,
        ownerFirstName,
        ownerLastName,
        industry,
        description,
        customerSupport,
        phoneNumber,
      }),
      address: JSON.stringify({
        country,
        districts: district,
        city,
        additionalInformation,
      }),
      certification: JSON.stringify({
        registeredBusinessName,
        businessType,
        businessRegistrationNumber: businessRegistrationNumber || "", // Send undefined if empty
      }),
      businessLogo, // Base64 string
      businessBanner, // Base64 string
      proofOfAddress, // Base64 string
      certificateOfIncorporation, // Base64 string
      taxRegistrationCertificate, // Base64 string
      complianceCertificate, // Base64 string
    };
  
    try {
      const response = await axios.put(
        `${server}/shop/update-seller-info`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
  
      toast.success("Shop info updated successfully!");
      dispatch(loadSeller());
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating shop info");
    }
  };
  // Modified to only handle local state
  const handleRemoveBanner = () => {
    setBusinessBanner("");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Logo Section */}
      <div className="w-full 800px:w-[80%] flex flex-col items-center gap-4 mt-5">
        <div className="relative flex flex-col items-center">
          <img
            src={businessLogo || "/dummy_user_profile.svg"}
            alt="Business Logo"
            className="w-[150px] h-[150px] rounded-full object-cover border-2 border-primary_color"
          />
          <input
            type="file"
            id="businessLogo"
            className="hidden"
            onChange={(e) => handleImage(e, "businessLogo")}
          />
          <label htmlFor="businessLogo" className="absolute bottom-2 right-2 bg-[#E3E9EE] rounded-full p-2 cursor-pointer">
            <AiOutlineCamera />
          </label>
          <span className="mt-2 text-sm ">Add Logo</span>
        </div>
      </div>

      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        {/* Business Info Form */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">1. Business Info</h2>
            <Link to="/ " className="flex gap-2 hover:underline">
             <p className="text-primary_color"> Forgot Password ? </p>
             <p className="text-secondary_color"> Change Password</p>
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div>
              <label className="block pb-2">Business Name</label>
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className={`${styles.input}`}
                required
              />
            </div>
            <div>
              <label className="block pb-2">Owner First Name</label>
              <input
                type="text"
                placeholder="Owner First Name"
                value={ownerFirstName}
                onChange={(e) => setOwnerFirstName(e.target.value)}
                className={`${styles.input}`}
                required
              />
            </div>
            <div>
              <label className="block pb-2">Owner Last Name</label>
              <input
                type="text"
                placeholder="Owner Last Name"
                value={ownerLastName}
                onChange={(e) => setOwnerLastName(e.target.value)}
                className={`${styles.input}`}
                required
              />
            </div>
            <div>
              <label className="block pb-2">Industry</label>
              <div className="flex flex-wrap gap-2 mb-2">
           
              </div>
              <select
                onChange={(e) => handleIndustrySelect(e.target.value)}
                className={`${styles.input} text-primary_color`}
                value=""
              >
                <option value="" className="text-primary_color">Select Industry</option>
                {categoriesData
                  .filter(category => !industry.includes(category.title))
                  .map((category) => (
                    <option 
                      key={category.id} 
                      value={category.title} 
                      className="text-primary_color"
                    >
                      {category.title}
                    </option>
                  ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {industry.map((ind, index) => (
                  <div 
                    key={index}
                    className="bg-primary_color text-text_color text-sm   p-2  flex items-center gap-2"
                  >
                    {ind}
                    <AiOutlineClose 
                      className="cursor-pointer"
                      onClick={() => handleRemoveIndustry(ind)}
                    />
                  </div>
                ))}

              </div>



            </div>
            <div>
              <label className="block pb-2">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.input}`}
                required
              />
            </div>
            <div>
              <label className="block pb-2">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`${styles.input}`}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block pb-2">Banner</label>
              <div className="relative w-full">
                {businessBanner ? (
                  <div className="relative">
                    <img
                      src={businessBanner}
                      alt="Business Banner"
                      className="w-full h-[200px] object-cover border-2 border-primary_color rounded"
                    />
                    <button
                      onClick={handleRemoveBanner}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      type="button"
                    >
                      <AiOutlineClose size={20} />
                    </button>
                    <input
                      type="file"
                      id="businessBanner"
                      className="hidden"
                      onChange={(e) => handleImage(e, "businessBanner")}
                    />
                    <label
                      htmlFor="businessBanner"
                      className="absolute bottom-2 right-2 bg-[#E3E9EE] rounded-full p-2 cursor-pointer"
                    >
                      <AiOutlineCamera />
                    </label>
                  </div>
                ) : (
                  <div className="w-full h-[200px] border-2 border-primary_color rounded flex flex-col items-center justify-center bg-gray-50">
                    <AiOutlineCamera size={40} className="text-primary_color" />
                    <span className="mt-2 ">Add Business Banner</span>
                    <input
                      type="file"
                      id="businessBanner"
                      className="hidden"
                      onChange={(e) => handleImage(e, "businessBanner")}
                    />
                    <label
                      htmlFor="businessBanner"
                      className="absolute bottom-2 right-2 bg-[#E3E9EE] rounded-full p-2 cursor-pointer"
                    >
                      <AiOutlineCamera />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block pb-2">Business Description</label>
            <textarea
              placeholder="Describe your business..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} min-h-[100px]`}
            />
          </div>
          <div>
            <label className="block pb-2">Customer Support</label>
            <input
              type="text"
              placeholder="Customer Support Contact"
              value={customerSupport}
              onChange={(e) => setCustomerSupport(e.target.value)}
              className={`${styles.input}`}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1em] bg-primary_color text-text_color my-8" />

        {/* Address Form */}
        <div className="w-full">
          <h2 className=" font-bold mb-4">2. Address</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div>
              <label className="block pb-2">Country</label>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setDistrict("");
                }}
                className={`${styles.input} text-primary_color`}
                required
              >
                <option value="" className="text-primary_color">Select Country</option>
                {Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} value={country.isoCode} className="text-primary_color">
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block pb-2">State/District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={`${styles.input} text-primary_color`}
                required
                disabled={!country}
              >
                <option value="" className="text-primary_color">Select State/District</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.name} className="text-primary_color">
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block pb-2">City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`${styles.input}`}
                required
              />
            </div>




            <div className="block pb-2">
              <FileInput
                label="Proof of Address"
                type="proofOfAddress"
                value={proofOfAddress}
              />
            </div>


            
            <div>
              <label className=" col-span-1 md:col-span-2 ">Additional Information</label>
              <textarea
                placeholder="Additional Information"
                value={additionalInformation}
                onChange={(e) => setAdditionalInformation(e.target.value)}
                className={`${styles.input} text-sm text-primary_color`}
              />
            </div>



            
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1em] bg-primary_color text-text_color my-8" />

        {/* Documents Section */}
        <div className="w-full">
          <h2 className="font-bold mb-4">3. Documents</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div>
              <label className="block pb-2">Registered Business Name</label>
              <input
                type="text"
                placeholder="Registered Business Name"
                value={registeredBusinessName}
                onChange={(e) => setRegisteredBusinessName(e.target.value)}
                className={`${styles.input}`}
                required
              />
            </div>
            <div>
              <label className="block pb-2">Business Type</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className={`${styles.input} text-primary_color`}
                required
              >
                <option value="" className="text-primary_color">Select Business Type</option>
                <option value="Sole Proprietor" className="text-primary_color">Sole Proprietor</option>
                <option value="Individual" className="text-primary_color">Individual</option>
                <option value="LLC" className="text-primary_color">LLC</option>
              </select>
            </div>
            <div>
              <label className="block pb-2">Business Registration Number</label>
              <input
                type="text"
                placeholder="Business Registration Number"
                value={businessRegistrationNumber}
                onChange={(e) => setBusinessRegistrationNumber(e.target.value)}
                className={`${styles.input}`}
                required
              />
            </div>
            <FileInput
              label="Certificate of Incorporation"
              type="certificateOfIncorporation"
              value={certificateOfIncorporation}
            />
            <FileInput
              label="Tax Registration Certificate"
              type="taxRegistrationCertificate"
              value={taxRegistrationCertificate}
            />
            <FileInput
              label="Compliance Certificate"
              type="complianceCertificate"
              value={complianceCertificate}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1em] bg-primary_color text-text_color my-8" />

        {/* Submit Button */}
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={updateHandler}
            className="w-full max-w-[200px] bg-secondary_color text-text_color h-[45px] rounded-[5px] hover:bg-secondary_color/90 transition-all duration-300"
          >
            Update Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopSettings;