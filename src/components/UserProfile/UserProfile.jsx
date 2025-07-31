import React, { useState, useEffect } from "react";
import { useAuth } from '../../api/AuthContext';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FaEdit } from 'react-icons/fa';
import { Navigate } from "react-router-dom";

function UserProfile() {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [editable, setEditable] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // data will be saved when edit is set ON
    if (!editable) {
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: formData.name,
        aboutMe: formData.aboutMe,
        age: formData.age,
        location: formData.location,
        imageUrl: formData.imageUrl,
      });
      //if we save succcessfully, we can set editable to false
      setEditable(false);
      setError(null);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError(error.message);
    }
  };

  return (
    <section className="u-align-center u-clearfix u-container-align-center u-grey-5 u-section-4" id="sec-9690">
      <div className="u-clearfix u-sheet u-sheet-1">
        <h1 className="u-text u-text-1">Profile</h1>
        {editable ? (
          <div style={{ color: 'orange', marginBottom: '1em', fontWeight: 'bold' }}>
            Editing mode: You can update your profile.
          </div>
        ) : (
          <div style={{ color: 'gray', marginBottom: '1em' }}>
            Viewing mode: Click "Edit" to update your profile.
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Editable Profile Image */}
          <div className="editable-field">
            <label htmlFor="name">Image:</label>
            {/* <div className="profile-image-container" style={{ marginBottom: '10px' }}> */}
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="u-input u-input-rectangle u-white"
              style={{ marginRight: '10px' }}
              disabled={!editable}
            />
            <img src={formData.imageUrl} style={{ width: '100px', height: '100px', objectFit: 'cover' }} alt="Profile" />
            {/* </div> */}
          </div>

          {/* Editable Name */}
          <div className="editable-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="u-input u-input-rectangle u-white"
              disabled={!editable}
              required
            />

          </div>

          {/* Editable About Me */}
          <div className="editable-field" style={{ backgroundColor: editable.aboutMe ? '#f0f0f0' : 'transparent' }}>
            <label htmlFor="aboutMe">About Me:</label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              className="u-input u-input-rectangle u-white"
              style={{ border: editable.aboutMe ? 'none' : '' }}
              disabled={!editable}
              required
            />

          </div>

          {/* Editable Age */}
          <div className="editable-field">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="u-input u-input-rectangle u-white"
              disabled={!editable}
              required
            />

          </div>

          {/* Editable Location */}
          <div className="editable-field">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="u-input u-input-rectangle u-white"
              disabled={!editable}
              required
            />
          </div>

          <div style={styles.buttonsContainer}>
            <button type="submit" style={styles.button}>
              Save Changes
            </button>
            <button onClick={() => setEditable(true)} style={styles.button}>
              Edit
            </button>
          </div>
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        </form>


      </div>
    </section>
  );
}

const styles = {
  button: {
    backgroundColor: 'lightblue', borderRadius: 5, padding: 10, width: '150px'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20%',
  },
}


export default UserProfile;