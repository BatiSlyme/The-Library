import { useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; 

function Create() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    if (!name || !image || !description) {
      setError('All fields are required!');
      return;
    }
  
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError('You must be logged in to create an entry');
      return;
    }
  
    try {
      const bookId = uuidv4(); 
  
      await addDoc(collection(db, 'books'), {
        id: bookId, 
        name,
        image,
        description,
        userId: currentUser.uid, 
        createdAt: new Date(),
        likes: {} 
      });
  
      setSuccess('Your entry has been created successfully!');
      setError('');
      setName('');
      setImage('');
      setDescription('');
  
      Navigate(`/personal-library`);
    } catch (error) {
      setError('Error creating entry: ' + error.message);
    }
  };

  return (
    <section className="u-align-center u-clearfix u-container-align-center u-image u-shading u-section-9" id="sec-2930" data-image-width="1280" data-image-height="720">
      <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <div className="u-container-style u-group u-white u-group-1">
          <div className="u-container-layout u-valign-middle u-container-layout-1">
            <h2 className="u-align-center u-text u-text-1">Create an entry for your book</h2>

            <div className="u-expanded-width-sm u-expanded-width-xs u-form u-form-1">
              <form onSubmit={handleSubmit} className="u-clearfix u-form-spacing-13 u-form-vertical u-inner-form" style={{ padding: "0px" }}>
                <div className="u-form-group u-form-name u-form-group-1">
                  <label htmlFor="name-f18c" className="u-label">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your book name"
                    id="name-f18c"
                    name="name"
                    className="u-grey-5 u-input u-input-rectangle u-input-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="u-form-date u-form-group u-form-group-2">
                  <label htmlFor="date-33f9" className="u-label">Image</label>
                  <input
                    type="text"
                    placeholder="Enter the URL for your image"
                    id="date-33f9"
                    name="message-2"
                    className="u-grey-5 u-input u-input-rectangle u-input-2"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>

                <div className="u-form-group u-form-message u-form-group-3">
                  <label htmlFor="message-1015" className="u-label">Description</label>
                  <textarea
                    placeholder="Enter your book description"
                    rows="4"
                    cols="50"
                    id="message-1015"
                    name="message-1"
                    className="u-grey-5 u-input u-input-rectangle u-input-3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                {error && <div className="u-form-send-error u-form-send-message">{error}</div>}
                {success && <div className="u-form-send-message u-form-send-success">{success}</div>}

                <div className="u-align-left u-form-group u-form-submit u-form-group-4">
                  <button type="submit" className="u-black u-btn u-btn-submit u-button-style u-btn-1">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Create;