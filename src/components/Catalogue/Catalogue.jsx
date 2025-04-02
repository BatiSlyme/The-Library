import { Link } from 'react-router-dom';

function Catalogue() {
    return (
        <>
            <section className="u-black u-clearfix u-section-3" id="sec-2eeb">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <div className="u-expanded-width u-products u-products-1">
                        <div className="u-list-control"></div>
                            <div className="u-repeater u-repeater-1">
                                
                                <div className="u-container-style u-products-item u-repeater-item">
                                    <div className="u-container-layout u-similar-container u-valign-bottom">
                                        <img
                                        src="/images/4.jpeg"
                                        alt="Product 1"
                                        className="u-expanded-width-lg u-image u-image-contain u-image-default u-product-control"
                                        />
                                        <h4 className="u-product-control u-text">
                                        <a className="u-product-title-link" href="#">Product 1</a>
                                        </h4>
                                        <div className="u-product-control u-product-desc u-text">
                                        Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.
                                        </div>
                                        <Link to="/details" className="u-active-grey-75 u-black u-border-none u-btn u-button-style u-hover-grey-75 u-product-control u-dialog-link u-payment-button">Details</Link>
                                    </div>
                                </div>

                                <div className="u-container-style u-products-item u-repeater-item">
                                    <div className="u-container-layout u-similar-container u-valign-bottom">
                                        <img
                                        src="/images/7.jpeg"
                                        alt="Product 2"
                                        className="u-expanded-width-lg u-image u-image-contain u-image-default u-product-control"
                                        />
                                        <h4 className="u-product-control u-text">
                                        <a className="u-product-title-link" href="#">Product 2</a>
                                        </h4>
                                        <div className="u-product-control u-product-desc u-text">
                                        Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.
                                        </div>
                                        <Link to="/details" className="u-active-grey-75 u-black u-border-none u-btn u-button-style u-hover-grey-75 u-product-control u-dialog-link u-payment-button">Details</Link>
                                    </div>
                                </div>

                                <div className="u-container-style u-products-item u-repeater-item">
                                    <div className="u-container-layout u-similar-container u-valign-bottom">
                                        <img
                                        src="/images/6.jpeg"
                                        alt="Product 3"
                                        className="u-expanded-width-lg u-image u-image-contain u-image-default u-product-control"
                                        />
                                        <h4 className="u-product-control u-text">
                                        <a className="u-product-title-link" href="#">Product 3</a>
                                        </h4>
                                        <div className="u-product-control u-product-desc u-text">
                                        Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.
                                        </div>
                                        <Link to="/details" className="u-active-grey-75 u-black u-border-none u-btn u-button-style u-hover-grey-75 u-product-control u-dialog-link u-payment-button">Details</Link>
                                    </div>
                                </div>

                            </div>
                        <div className="u-list-control"></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Catalogue;