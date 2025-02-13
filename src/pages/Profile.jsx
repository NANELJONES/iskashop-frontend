import React, { useState } from 'react';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';

const Profile = () => {
  const [active, setActive] = useState(1); // Default to 1 for Profile tab

  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-[335px]">
        <ProfileSidebar active={active} setActive={setActive} />
      </div>
      <div className="w-full lg:flex-1">
        <ProfileContent active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default Profile; 