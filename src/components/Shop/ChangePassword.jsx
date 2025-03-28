import React from "react";
import axios from "axios";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { server } from "../../server";
import { toast } from "react-toastify";
import styles from "../../styles/styles";


export const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const passwordChangeHandler = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const res = await axios.put(
          `${server}/shop/update-shop-password`,
          { oldPassword, newPassword, confirmPassword },
          {
            headers: {
              'token': localStorage.getItem('token')
            },
            withCredentials: true
          }
        );
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update password");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="w-full px-5">
        <h1 className="block text-left font-[600] pb-2">
          Change Password
        </h1>
        <div className="w-full">
          <form
            aria-required
            onSubmit={passwordChangeHandler}
            className="flex flex-col items-start"
          >
            <div className="w-[100%]  max-w-[600px] mt-5 ">
              <label className="block pb-2">Enter your old password</label>
              <div className="relative w-[95%] flex items-center gap-2">
                <input
                  type={showOldPassword ? "text" : "password"}
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0 pr-10`}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div 
                  className=" cursor-pointer"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  <AiOutlineEye 
                    size={20} 
                    className={`${showOldPassword ? 'text-primary_color' : 'text-gray-500'}`}
                  />
                </div>
              </div>
            </div>
  
            <div className="w-[100%]  max-w-[600px] mt-2">
              <label className="block pb-2">Enter your new password</label>
              <div className="relative w-[95%] flex items-center gap-2">
                <input
                  type={showNewPassword ? "text" : "password"}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 pr-10`}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div 
                  className=" cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <AiOutlineEye 
                    size={20} 
                    className={`${showNewPassword ? 'text-primary_color' : 'text-gray-500'}`}
                  />
                </div>
              </div>
            </div>
  
                <div className="w-[100%]  mt-2 max-w-[600px]">
              <label className="block pb-2">Enter your confirm password</label>
              <div className="relative w-[95%] flex items-center gap-2">    
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0 pr-10`}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div 
                    className=" cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <AiOutlineEye 
                    size={20} 
                    className={`${showConfirmPassword ? 'text-primary_color' : 'text-gray-500'}`}
                  />
                </div>
              </div>
              <button
                className={`w-[95%] h-[40px] border bg-primary_color text-text_color max-w-[150px] text-center rounded-[3px] mt-8 cursor-pointer flex items-center justify-center ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-text_color border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };