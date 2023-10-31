import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from API using authentication token
    const fetchUserData = async () => {
      try {
        const response = await fetch('API_ENDPOINT/users/profile', {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with actual token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {userData && (
        <div>
          <h3>Username: {userData.username}</h3>
          <img src={`API_ENDPOINT/${userData.profileImage}`} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default Profile;
