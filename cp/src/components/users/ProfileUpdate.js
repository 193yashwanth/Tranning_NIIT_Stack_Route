import React, { useState } from 'react';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    profileImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profileImage: file,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', formData.username);
    formData.append('profileImage', formData.profileImage);

    try {
      const response = await fetch('API_ENDPOINT/users/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with actual token
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Profile updated successfully!');
      } else {
        console.error('Profile update failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          type="file"
          name="profileImage"
          onChange={handleFileChange}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
