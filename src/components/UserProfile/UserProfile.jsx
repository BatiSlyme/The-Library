import React, { useState, useEffect } from "react";
import { useAuth } from '../../api/AuthContext';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FaEdit } from 'react-icons/fa';
import { Navigate } from "react-router-dom";

function UserProfile() {
  const { user } = useAuth();
  const [editable, setEditable] = useState({
    name: false,
    aboutMe: false,
    age: false,
    location: false,
    imageUrl: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    aboutMe: '',
    age: '',
    location: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    const fetchUserData = async () => {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setFormData({
          name: data.name || '',
          aboutMe: data.aboutMe || '',
          age: data.age || '',
          location: data.location || '',
          imageUrl: data.imageUrl || '', 
        });
      } else {
        console.error("No such document!");
      }
    };

    fetchUserData();
  }, [user]);

  const handleEdit = (field) => {
    setEditable((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", user.uid); 
      await updateDoc(userRef, {
        name: formData.name,
        aboutMe: formData.aboutMe,
        age: formData.age,
        location: formData.location,
        imageUrl: formData.imageUrl, 
      });
      setEditable({
        name: false,
        aboutMe: false,
        age: false,
        location: false,
        imageUrl: false,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const isEditing = Object.values(editable).includes(true);

  return (
    <section className="u-align-center u-clearfix u-container-align-center u-grey-5 u-section-4" id="sec-9690">
      <div className="u-clearfix u-sheet u-sheet-1">
        <h1 className="u-text u-text-1">Profile</h1>

        {/* Editable Profile Image */}
        <div className="editable-field">
          <div className="profile-image-container" style={{ marginBottom: '10px' }}>
            {editable.imageUrl ? (
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="u-input u-input-rectangle u-white"
                style={{ marginRight: '10px' }}
              />
            ) : (
              <div
                className="u-image u-image-circle u-image-1"
                style={{ backgroundImage: `url(${formData.imageUrl || '/images/default-profile.jpg'})` }}
              ></div>
            )}
            <FaEdit onClick={() => handleEdit("imageUrl")} />
          </div>
        </div>

        {/* Editable Name */}
        <div className="editable-field">
          <label htmlFor="name">Name:</label>
          {editable.name ? (
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="u-input u-input-rectangle u-white"
            />
          ) : (
            <p>{formData.name}</p>
          )}
          <FaEdit onClick={() => handleEdit("name")} />
        </div>

        {/* Editable About Me */}
        <div className="editable-field" style={{ backgroundColor: editable.aboutMe ? '#f0f0f0' : 'transparent' }}>
          <label htmlFor="aboutMe">About Me:</label>
          {editable.aboutMe ? (
            <textarea
              id="aboutMe"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              className="u-input u-input-rectangle u-white"
              style={{ border: editable.aboutMe ? 'none' : '' }}
            />
          ) : (
            <p>{formData.aboutMe}</p>
          )}
          <FaEdit onClick={() => handleEdit("aboutMe")} />
        </div>

        {/* Editable Age */}
        <div className="editable-field">
          <label htmlFor="age">Age:</label>
          {editable.age ? (
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="u-input u-input-rectangle u-white"
            />
          ) : (
            <p>{formData.age}</p>
          )}
          <FaEdit onClick={() => handleEdit("age")} />
        </div>

        {/* Editable Location */}
        <div className="editable-field">
          <label htmlFor="location">Location:</label>
          {editable.location ? (
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="u-input u-input-rectangle u-white"
            />
          ) : (
            <p>{formData.location}</p>
          )}
          <FaEdit onClick={() => handleEdit("location")} />
        </div>

        {/* Show Save Changes Button only if any field is in edit mode */}
        {isEditing && (
          <button onClick={handleSave} className="u-button u-button-submit">
            Save Changes
          </button>
        )}
      </div>
    </section>
  );
}

export default UserProfile;