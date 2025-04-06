import { useState, useEffect } from 'react';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import BookEntryCatalogue from '../BookEntryCatalogue/BookEntryCatalogue'; 

function Catalogue() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'books'); 
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(productsList);
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  return (
    <section className="u-black u-clearfix u-section-3" id="sec-2eeb">
      <div className="u-clearfix u-sheet u-sheet-1">
        <div className="u-expanded-width u-products u-products-1">
          <div className="u-list-control"></div>
          <div className="u-repeater u-repeater-1">
            {products.map((product) => (
              <BookEntryCatalogue key={product.id} product={product} />
            ))}
          </div>
          <div className="u-list-control"></div>
        </div>
      </div>
    </section>
  );
}

export default Catalogue;