import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; 
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; 

function BookEntryPersonal({ book, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const booksRef = collection(db, 'books');
      const bookQuery = query(booksRef, where('id', '==', book.id)); 
      const querySnapshot = await getDocs(bookQuery);

      if (!querySnapshot.empty) {
        const docRef = doc(db, 'books', querySnapshot.docs[0].id);
        await deleteDoc(docRef); 
        onDelete(book.id); 
      }
    } catch (error) {
      console.error('Error deleting book: ', error);
    }
  };

  const truncateDescription = (description, length = 100) => {
    return description.length > length ? description.substring(0, length) + '...' : description;
  };

  return (
    <div
      className="u-container-style u-image u-list-item u-repeater-item u-shading u-image-2"
      style={{ backgroundImage: `url(${book.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      data-image-width="2000"
      data-image-height="1333"
    >
      <div className="u-container-layout u-similar-container u-valign-top-lg u-valign-top-md u-valign-top-sm u-valign-top-xs u-container-layout-2">
        <h3 className="u-text u-text-default u-text-7">{book.name}</h3>
        <p className="u-text u-text-default u-text-8">{truncateDescription(book.description)}</p>
        <h6 className="u-text u-text-default u-text-9">
          <Link to={`/edit/${book.id}`}>Edit</Link>
        </h6>
        <h6 className="u-text u-text-default u-text-10">
          <button
            onClick={handleDelete}
            className="u-active-none u-border-none u-btn u-button-link u-button-style u-dialog-link u-hover-none u-none u-text-body-alt-color u-btn-2"
          >
            Delete
          </button>
        </h6>
        <h6 className="u-text u-text-default u-text-11">
          <Link to={`/details/${book.id}`} className="u-text u-text-default">Details</Link>
        </h6>
      </div>
    </div>
  );
}

export default BookEntryPersonal;