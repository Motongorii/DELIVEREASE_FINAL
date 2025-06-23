import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from "../assets/avatar.png";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Fed',
    email: 'admin@deliverease.com',
    phone: '+234 801 234 5678',
    role: 'Administrator',
    department: 'Operations',
    avatar: avatar,
    bio: 'Experienced delivery service administrator with 5+ years in logistics management.'
  });

  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    // Load profile data from localStorage if available
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setFormData(parsedProfile);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    localStorage.setItem('adminProfile', JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Profile Settings</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                style={{
                  background: '#2d3edb',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={handleSignOut}
                style={{
                  background: '#c0392b',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginLeft: '1rem'
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleSave}
                style={{
                  background: '#27ae60',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Save Changes
              </button>
              <button 
                onClick={handleCancel}
                style={{
                  background: '#95a5a6',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Avatar Section */}
        <div style={{ flex: '0 0 200px', textAlign: 'center' }}>
          <div style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            margin: '0 auto 1rem',
            border: '3px solid #2d3edb'
          }}>
            <img 
              src={isEditing ? formData.avatar : profile.avatar} 
              alt="Profile Avatar" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {isEditing && (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ fontSize: '0.8rem' }}
              />
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                Upload a new profile picture
              </p>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                ) : (
                  <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '6px', fontSize: '1rem' }}>
                    {profile.name}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                ) : (
                  <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '6px', fontSize: '1rem' }}>
                    {profile.email}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                ) : (
                  <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '6px', fontSize: '1rem' }}>
                    {profile.phone}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  Role
                </label>
                <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '6px', fontSize: '1rem' }}>
                  {profile.role}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  Department
                </label>
                <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '6px', fontSize: '1rem' }}>
                  {profile.department}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                ) : (
                  <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '6px', fontSize: '1rem', lineHeight: '1.5' }}>
                    {profile.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 