import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address?.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.businessInfo?.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.address?.zipCode);
  const [country, setCountry] = useState(seller && seller.address?.country);
  const [region, setRegion] = useState(seller && seller.address?.districts);
  const [businessLogo, setBusinessLogo] = useState();
  const [businessBanner, setBusinessBanner] = useState();
  const [proofOfAddress, setProofOfAddress] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller) {
      setName(seller.name);
      setDescription(seller.description || "");
      setAddress(seller.address?.address || "");
      setPhoneNumber(seller.businessInfo?.phoneNumber || "");
      setZipcode(seller.address?.zipCode || "");
      setCountry(seller.address?.country || "");
      setRegion(seller.address?.districts || "");
    }
  }, [seller]);

  const handleImage = async (e, type) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        if (type === "avatar") {
          setAvatar(reader.result);
        } else if (type === "businessLogo") {
          setBusinessLogo(reader.result);
        } else if (type === "businessBanner") {
          setBusinessBanner(reader.result);
        } else if (type === "proofOfAddress") {
          setProofOfAddress(reader.result);
        }

        axios
          .put(
            `${server}/shop/update-shop-${type}`,
            { [type]: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch(loadSeller());
            toast.success(`${type} updated successfully!`);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address: {
            address,
            country,
            districts: region,
            zipCode,
          },
          businessInfo: {
            phoneNumber,
          },
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated successfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={avatar ? avatar : `${seller?.avatar?.url}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={(e) => handleImage(e, "avatar")}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="text"
              placeholder={`${seller?.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Description</label>
            </div>
            <input
              type="text"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="text"
              placeholder={seller?.address?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="text"
              placeholder={seller?.businessInfo?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="text"
              placeholder={seller?.address?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Country</label>
            </div>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Region</label>
            </div>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            >
              <option value="">Select Region</option>
              {State.getStatesOfCountry(country).map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Business Logo</label>
            </div>
            <div className="relative">
              <img
                src={businessLogo ? businessLogo : `${seller?.businessInfo?.businessLogo?.url}`}
                alt=""
                className="w-[200px] h-[200px] rounded-full cursor-pointer"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
                <input
                  type="file"
                  id="businessLogo"
                  className="hidden"
                  onChange={(e) => handleImage(e, "businessLogo")}
                />
                <label htmlFor="businessLogo">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Business Banner</label>
            </div>
            <div className="relative">
              <img
                src={businessBanner ? businessBanner : `${seller?.businessInfo?.businessBanner?.url}`}
                alt=""
                className="w-[200px] h-[200px] rounded-full cursor-pointer"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
                <input
                  type="file"
                  id="businessBanner"
                  className="hidden"
                  onChange={(e) => handleImage(e, "businessBanner")}
                />
                <label htmlFor="businessBanner">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Proof of Address</label>
            </div>
            <div className="relative">
              <img
                src={proofOfAddress ? proofOfAddress : `${seller?.address?.proofOfAddress?.url}`}
                alt=""
                className="w-[200px] h-[200px] rounded-full cursor-pointer"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
                <input
                  type="file"
                  id="proofOfAddress"
                  className="hidden"
                  onChange={(e) => handleImage(e, "proofOfAddress")}
                />
                <label htmlFor="proofOfAddress">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;