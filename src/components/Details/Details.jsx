import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';

function Details() {
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [docId, setDocId] = useState('');
  const [userReaction, setUserReaction] = useState(null);
  const { bookId } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!bookId) {
        setError('Invalid book ID');
        return;
      }

      try {
        const booksRef = collection(db, 'books');
        const bookQuery = query(booksRef, where('id', '==', bookId));
        const querySnapshot = await getDocs(bookQuery);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const bookData = docSnap.data();
          setBook(bookData);
          setDocId(docSnap.id);

          const likes = bookData.likes || {};
          if (user && likes[user.uid]) {
            setUserReaction(likes[user.uid]);
          }
        } else {
          setError('Book not found');
        }
      } catch (error) {
        setError('Error fetching book details: ' + error.message);
      }
    };

    fetchBookDetails();
  }, [bookId, user]);

  const handleReaction = async (reactionType) => {
    if (!user || !docId) return;

    try {
      const bookRef = doc(db, 'books', docId);
      const updatedLikes = { ...(book.likes || {}) };

      if (userReaction === reactionType) {
        delete updatedLikes[user.uid];
        setUserReaction(null);
      } else {
        updatedLikes[user.uid] = reactionType;
        setUserReaction(reactionType);
      }

      await updateDoc(bookRef, { likes: updatedLikes });
    } catch (error) {
      console.error('Error updating reaction:', error.message);
    }
  };

  const isLiked = userReaction === 'like';
  const isDisliked = userReaction === 'dislike';

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <section
        className="u-align-left u-clearfix u-image u-shading u-section-6"
        style={{
          backgroundImage: `url(${book?.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        id="block-2"
        data-image-width="1280"
        data-image-height="853"
      >
        <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
          <h1 className="u-align-left u-text u-title u-text-1">Details</h1>

          {/* First span — Go Back Button */}
          <span
            className="u-file-icon u-icon u-icon-1"
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer' }}
            title="Go Back"
          >
            <img src="/images/93634.png" alt="Go Back" />
          </span>

          {/* Like Button */}
          <span
            className="u-file-icon u-icon u-icon-2"
            onClick={() => handleReaction('like')}
            style={{ cursor: 'pointer', filter: isLiked ? 'brightness(0) invert(1)' : 'none' }}
            title="Like"
          >
            <img src="/images/1864961.png" alt="Like" />
          </span>

          {/* Dislike Button */}
          <span
            className="u-file-icon u-icon u-icon-3"
            onClick={() => handleReaction('dislike')}
            style={{ cursor: 'pointer', filter: isDisliked ? 'brightness(0) invert(1)' : 'none' }}
            title="Dislike"
          >
            <img src="/images/1633636.png" alt="Dislike" />
          </span>

          <h1 className="u-align-left u-text u-text-default u-title u-text-2">{book?.name}</h1>
          <p className="u-align-left u-large-text u-text u-text-variant u-text-3">{book?.description}</p>
          <Link
            to="/comment-section"
            className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius u-btn-1"
          >
            Comments
          </Link>
        </div>
      </section>
    </>
  );
}

export default Details;