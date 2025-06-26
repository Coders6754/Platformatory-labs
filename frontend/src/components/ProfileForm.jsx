import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const ProfileForm = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    city: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [workflowId, setWorkflowId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          phoneNumber: response.data.phoneNumber || '',
          city: response.data.city || '',
          pincode: response.data.pincode || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage({ type: 'error', text: 'Failed to load profile data' });
        setLoading(false);
      }
    };

    fetchProfile();
  }, [getAccessTokenSilently]);

  // Check workflow status
  useEffect(() => {
    if (workflowId) {
      const interval = setInterval(async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/workflow/${workflowId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          
          if (response.data.status === 'COMPLETED') {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            clearInterval(interval);
            setSaving(false);
            setWorkflowId(null);
          }
        } catch (error) {
          console.error('Error checking workflow status:', error);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [workflowId, getAccessTokenSilently]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/profile`, 
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setWorkflowId(response.data.workflowId);
      setMessage({ 
        type: 'info', 
        text: 'Profile update in progress. Changes will be applied shortly...' 
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner-icon"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Edit Profile</h2>
      
      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            className="input"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              City
            </label>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              className="input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={profile.pincode}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm; 