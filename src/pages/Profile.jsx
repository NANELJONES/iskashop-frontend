import React, { useState } from 'react';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';

const Profile = () => {
  const [active, setActive] = useState(2); // Default to 2 for Orders tab
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
    <h3 className='absolute top-0 left-0'>{active}</h3>
      {isLoading && (
        <div className="fixed inset-0g-primary_color flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            Loading...
          </div>
        </div>
      )}
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-[335px]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-full lg:flex-1">
          <ProfileContent active={active} setActive={setActive}  />
        </div>
      </div>
    </>
  );
};

export default Profile; 