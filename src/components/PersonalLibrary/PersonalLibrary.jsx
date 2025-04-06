import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase'; // Assuming you have set up Firebase
import { collection, getDocs, query, where } from 'firebase/firestore'; // Firestore methods
import BookEntryPersonal from '../BookEntryPersonal/BookEntryPersonal'; // Import the BookEntryPersonal component

function PersonalLibrary() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchBooks = async () => {
            if (currentUser) {
                try {
                    const q = query(collection(db, 'books'), where('userId', '==', currentUser.uid));
                    const querySnapshot = await getDocs(q);
                    const booksArray = querySnapshot.docs.map(doc => doc.data());
                    setBooks(booksArray);
                } catch (error) {
                    console.error("Error fetching books:", error);
                }
            }
            setLoading(false);
        };

        fetchBooks();
    }, [currentUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDeleteBook = (bookId) => {
        // Remove the deleted book from the books list in state
        setBooks(books.filter((book) => book.id !== bookId));
      };

    return (
        <>
            <section className="u-clearfix u-image u-section-5" id="block-1">
                <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
                    <h1 className="u-custom-font u-font-georgia u-text u-text-body-alt-color u-text-default u-title u-text-1">Personal Library</h1>
                    <div className="u-expanded-width u-list u-list-1">
                        <div className="u-repeater u-repeater-1">
                            {books.length > 0 ? (
                                books.map((book, index) => (
                                    <BookEntryPersonal key={index} book={book} onDelete={handleDeleteBook} />
                                ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>
                    <Link to="/create" className="u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius u-btn-4">Create</Link>
                </div>
            </section>
        </>
    );
}

export default PersonalLibrary;