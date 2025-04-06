import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

function CommentSection() {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [comments, setComments] = useState([]);
  const { bookId } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  // Fetch comments for the specific book
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRef = collection(db, 'comments');
        const q = query(commentsRef, where('bookId', '==', bookId));
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map(doc => doc.data());
        setComments(fetchedComments);
      } catch (error) {
        setError('Error fetching comments: ' + error.message);
      }
    };

    fetchComments();
  }, [bookId]);

  // Handle comment submission
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
        comment,
        createdAt: new Date(),
      });

      setSuccess('Your comment has been added!');
      setError('');
      setComment('');
      setComments((prevComments) => [...prevComments, { content: comment, userId: currentUser.uid }]);
    } catch (error) {
      setError('Error submitting comment: ' + error.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <section className="u-align-left u-clearfix u-image u-shading u-section-7" id="sec-c4d5" data-image-width="1280" data-image-height="853">
        <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
          <span className="u-file-icon u-icon u-icon-1" onClick={handleGoBack} style={{ cursor: 'pointer' }}>
            <img src="/images/93634.png" alt="Go back" />
          </span>
          <h1 className="u-align-left u-text u-text-default u-text-1">Sample Headline</h1>
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

          {/* Render existing comments */}
          <div className="u-form-comments u-clearfix u-rich-text u-text u-text-3">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="u-comment">
                  <h4>User {comment.userId}:</h4>
                  <p>{comment.comment}</p>
                </div>
              ))
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default CommentSection;