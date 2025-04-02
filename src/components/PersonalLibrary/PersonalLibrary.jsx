import { Link } from 'react-router-dom';

function PersonalLibrary() {
    return (
        <>
            <section className="u-clearfix u-section-5" id="block-1">
                <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
                    <h2 className="u-text u-text-default u-text-1">Personal Library</h2>
                    <div className="u-expanded-width u-list u-list-1">
                    <div className="u-repeater u-repeater-1">
                        <div 
                        className="u-container-style u-image u-list-item u-repeater-item u-shading u-image-1" 
                        data-image-width="2000" 
                        data-image-height="1333"
                        >
                        <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1">
                            <h3 className="u-text u-text-default u-text-2">Sample Headline</h3>
                            <p className="u-text u-text-default u-text-3">
                            Sample text. Click to select the text box. Click again or double click to start editing the text.
                            </p>
                            <Link to="/details" className="u-active-grey-75 u-black u-border-none u-btn u-button-style u-hover-grey-75 u-product-control u-dialog-link u-payment-button">Details</Link>
                        </div>
                        </div>
                        <div 
                        className="u-container-style u-image u-list-item u-repeater-item u-shading u-image-2" 
                        data-image-width="2000" 
                        data-image-height="1333"
                        >
                        <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                            <h3 className="u-text u-text-default u-text-4">Sample Headline</h3>
                            <p className="u-text u-text-default u-text-5">
                            Sample text. Click to select the text box. Click again or double click to start editing the text.
                            </p>
                            <Link to="/details" className="u-active-grey-75 u-black u-border-none u-btn u-button-style u-hover-grey-75 u-product-control u-dialog-link u-payment-button">Details</Link>
                        </div>
                        </div>
                        <div 
                        className="u-container-style u-image u-list-item u-repeater-item u-shading u-image-3" 
                        data-image-width="2000" 
                        data-image-height="1333"
                        >
                        <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3">
                            <h3 className="u-text u-text-default u-text-6">Sample Headline</h3>
                            <p className="u-text u-text-default u-text-7">
                            Sample text. Click to select the text box. Click again or double click to start editing the text.
                            </p>
                            <Link to="/details" className="u-active-grey-75 u-black u-border-none u-btn u-button-style u-hover-grey-75 u-product-control u-dialog-link u-payment-button">Details</Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PersonalLibrary;