import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

import './index.css'; // Ensure you have appropriate CSS for styling the popup

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updateUsername, setUpdateUsername] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');

  const getProfileData = async () => {
    try {
      const token = Cookies.get('jwtToken');
      if (!token) {
        console.error('JWT token is missing. Please log in.');
        setError('JWT token is missing. Please log in.');
        setIsLoading(false);
        return;
      }

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await fetch('https://oscowl-todo.onrender.com/profile', options);

      if (!response.ok) {
        throw new Error(`Failed to fetch profile data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const token = Cookies.get('jwtToken');
      if (!token) {
        throw new Error('JWT token is missing. Please log in.');
      }

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username: updateUsername, password: updatePassword, email: updateEmail }),
      };

      const response = await fetch('https://oscowl-todo.onrender.com/profile', options);

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status} ${response.statusText}`);
      }

      const updatedData = await response.json();
      setUser(updatedData);
      alert('Profile updated successfully!');
      setShowModal(false);
      getProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile: ' + error.message);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-details">
          <span className="profile-icon"><CgProfile /></span>
          <h3>Username: {user.username}</h3>
          <h3>Email: {user.email}</h3>
          <p>Password: ************</p>
          <button className="update-btn" onClick={() => setShowModal(true)}>Update Profile</button>
          <button className="home-btn">
            <Link to='/' className='link-to-home'>Go to Home</Link>
          </button>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Update Profile</h2>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={updateUsername}
                onChange={(e) => setUpdateUsername(e.target.value)}
                placeholder='Username'
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
                placeholder='Email'
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
                placeholder='Password'
              />
            </label>
            <div className="modal-actions">
              <button onClick={updateProfile}>Update</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

