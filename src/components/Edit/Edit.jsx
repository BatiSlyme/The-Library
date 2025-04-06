import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

function Edit() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { bookId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const booksRef = collection(db, 'books'); 
        const bookQuery = query(booksRef, where("id", "==", bookId)); 
        const querySnapshot = await getDocs(bookQuery); 

        console.log(querySnapshot); 

        if (!querySnapshot.empty) {
          const bookData = querySnapshot.docs[0].data(); 
          setName(bookData.name);
          setImage(bookData.image);
          setDescription(bookData.description);
        } else {
          setError('Book not found');
        }
      } catch (error) {
        setError('Error fetching book data: ' + error.message);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image || !description) {
      setError('All fields are required!');
      return;
    }

    try {
      const booksRef = collection(db, 'books'); 
      const bookQuery = query(booksRef, where("id", "==", bookId)); 
      const querySnapshot = await getDocs(bookQuery); 

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id; 
        await updateDoc(doc(db, 'books', docId), {
          name,
          image,
          description,
          updatedAt: new Date(),
        });

        setSuccess('Book updated successfully!');
        setError('');
        navigate('/personal-library'); 
      } else {
        setError('Book not found');
      }
    } catch (error) {
      setError('Error updating book: ' + error.message);
    }
  };

  return (
    <>
      <section className="u-align-center u-clearfix u-container-align-center u-image u-section-8" id="sec-4297">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="u-container-style u-group u-white u-group-1">
            <div className="u-container-layout u-valign-middle u-container-layout-1">
              <h2 className="u-align-center u-text u-text-1">Edit Book</h2>
              <div className="u-expanded-width-sm u-expanded-width-xs u-form u-form-1">
                <form onSubmit={handleSubmit} className="u-clearfix u-form-spacing-13 u-form-vertical u-inner-form" style={{ padding: '0px' }}>
                  <div className="u-form-group u-form-name u-form-group-1">
                    <label htmlFor="name-f18c" className="u-label">Name</label>
                    <input
                      type="text"
                      placeholder="Enter the book's name"
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
                      placeholder="Enter the URL for the image"
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
                      placeholder="Description"
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

                  <div className="u-align-center u-form-group u-form-submit u-form-group-4">
                    <button type="submit" className="u-black u-btn u-btn-submit u-button-style u-btn-1">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Edit;