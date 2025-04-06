import { Link } from 'react-router-dom';

function BookEntryCatalogue({ product }) {

  // Truncate the description
  const truncateDescription = (description, length = 100) => {
    return description.length > length ? description.substring(0, length) + '...' : description;
  };

  return (
    <div className="u-container-style u-products-item u-repeater-item">
      <div className="u-container-layout u-similar-container u-valign-bottom">
        <img
          src={product.image}
          alt={product.name}
          className="u-expanded-width-lg u-image u-image-contain u-image-default u-product-control"
        />
        <h4 className="u-product-control u-text">
          <a className="u-product-title-link" href="#">
            {product.name}
          </a>
        </h4>
        <div className="u-product-control u-product-desc u-text">
          {truncateDescription(product.description)}
        </div>
        <Link
          to={`/details/${product.id}`}
          className="u-active-grey-75 u-black u-border-none u-btn u-button-style u-hover-grey-75 u-product-control u-dialog-link u-payment-button"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

export default BookEntryCatalogue;