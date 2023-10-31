import React from 'react';

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('API_ENDPOINT/users/delete', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with actual token
        },
      });

      if (response.ok) {
        console.log('Account deleted successfully!');
      } else {
        console.error('Account deletion failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default DeleteAccount;
