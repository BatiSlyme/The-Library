import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

function CommentSection() {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [comments, setComments] = useState([]);
  const [bookData, setBookData] = useState(null);
  const [userMap, setUserMap] = useState({}); 
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRef = collection(db, 'books');
        const bookQuery = query(booksRef, where('id', '==', bookId));
        const bookSnapshot = await getDocs(bookQuery);

        if (!bookSnapshot.empty) {
          const bookDoc = bookSnapshot.docs[0];
          const bookInfo = bookDoc.data();
          setBookData(bookInfo);
          console.log('Book data:', bookInfo);
        } else {
          setError('Book not found.');
          return;
        }

        const commentsRef = collection(db, 'comments');
        const q = query(commentsRef, where('bookId', '==', bookId));
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);

        const uniqueUserIds = [
          ...new Set(fetchedComments.map((comment) => comment.userId)),
        ];

        const usersCollection = collection(db, 'users');
        const userDocs = await Promise.all(
          uniqueUserIds.map((userId) => getDoc(doc(usersCollection, userId)))
        );

        const userMapData = {};
        userDocs.forEach((userDoc, i) => {
          const userId = uniqueUserIds[i];
          if (userDoc.exists()) {
            const userData = userDoc.data();
            userMapData[userId] = userData.displayName || 'Unnamed User';
          } else {
            userMapData[userId] = 'Deleted User';
          }
        });
        setUserMap(userMapData);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchData();
  }, [bookId]); 

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    if (!comment) {
      setError('Please enter a comment!');
      return;
    }
  
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError('You must be logged in to comment');
      return;
    }
  
    try {
      await addDoc(collection(db, 'comments'), {
        bookId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Unknown',  // Save the name too
        comment,
        createdAt: new Date(),
      });
  
      setSuccess('Your comment has been added!');
      setError('');
      setComment('');
      setComments((prevComments) => [
        ...prevComments,
        {
          comment,
          userId: currentUser.uid,
          userName: currentUser.displayName || 'Unknown', // Update local state
        },
      ]);
    } catch (error) {
      setError('Error submitting comment: ' + error.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section
      className="u-align-left u-clearfix u-image u-shading u-section-7"
      id="sec-c4d5"
      data-image-width="1280"
      data-image-height="853"
      style={
        bookData?.image
          ? {
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bookData.image})`,
              backgroundPosition: '50% 50%',
              backgroundRepeat: 'no-repeat, no-repeat',
              backgroundSize: 'cover, cover',
            }
          : {}
      }
    >
      <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
        <span
          className="u-file-icon u-icon u-icon-1"
          onClick={handleGoBack}
          title="Go Back"
          style={{
            cursor: 'pointer',
            transition: 'filter 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector('img').style.filter = 'brightness(0) invert(1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector('img').style.filter = 'none';
          }}
        >
          <img src="/images/93634.png" alt="Go Back" />
        </span>

        {bookData && (
          <h1 className="u-align-left u-text u-text-default u-text-1">{bookData.name}</h1>
        )}

        <h1 className="u-align-left u-text u-text-2">Comments</h1>

        {/* Comment Form */}
        <div className="u-form u-form-1">
          <form
            onSubmit={handleCommentSubmit}
            className="u-clearfix u-form-horizontal u-form-spacing-10 u-inner-form"
            style={{ padding: '10px' }}
          >
            <div className="u-form-email u-form-group">
              <input
                type="text"
                placeholder="Enter your comment here"
                id="comment"
                name="comment"
                className="u-input u-input-rectangle u-none"
                required
                maxLength="100"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {error && <div className="u-form-send-error u-form-send-message">{error}</div>}
            {success && <div className="u-form-send-message u-form-send-success">{success}</div>}
            <div className="u-align-left u-form-group u-form-submit">
              <button type="submit" className="u-border-none u-btn u-btn-submit u-button-style u-palette-1-base u-btn-1">
                Comment
              </button>
            </div>
          </form>
        </div>

        {/* Comments Display */}
        <div className="u-form-comments u-clearfix u-rich-text u-text u-text-3">
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <div key={index} className="u-comment">
                <h4>{c.userName}:</h4>
                <p>{c.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CommentSection;