import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);
  

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={`${styles.section}   flex items-start md:gap-[1em] py-10`}>
            <div className={`w-auto sticky 800px:mt-0 ${showSidebar ? 'block' : 'hidden'} 800px:block`}>
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <div className="w-full">
              <div className="w-full flex items-center justify-end px-4 py-2 800px:hidden">
                <RxHamburgerMenu
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setShowSidebar(prev => !prev)}
                />
              </div>
              <div>
           
            
              <ProfileContent active={active} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
