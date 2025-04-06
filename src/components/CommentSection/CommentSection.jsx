function CommentSection() {
    return (
        <>
            <section className="u-align-left u-clearfix u-image u-shading u-section-7" id="sec-c4d5" data-image-width="1280" data-image-height="853">
                <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
                    <span className="u-file-icon u-icon u-icon-1">
                    <img src="images/93634.png" alt="" />
                    </span>
                    <h1 className="u-align-left u-text u-text-default u-text-1">Sample Headline</h1>
                    <h1 className="u-align-left u-text u-text-2">Comments</h1>
                    <div className="u-form u-form-1">
                    <form
                        action="https://forms.nicepagesrv.com/v2/form/process"
                        className="u-clearfix u-form-horizontal u-form-spacing-10 u-inner-form"
                        source="email"
                        name="form-1"
                        style={{ padding: "10px" }}
                    >
                        <div className="u-form-email u-form-group">
                        <label htmlFor="email-528c" className="u-label"></label>
                        <input
                            type="email"
                            placeholder="Enter your comment here"
                            id="email-528c"
                            name="comment"
                            className="u-input u-input-rectangle u-none"
                            required
                            maxLength="100"
                        />
                        </div>
                        <div className="u-align-left u-form-group u-form-submit">
                        <a href="#" className="u-border-none u-btn u-btn-submit u-button-style u-palette-1-base u-btn-1">
                            Comment
                        </a>
                        <input type="submit" value="submit" className="u-form-control-hidden" />
                        </div>
                        <div className="u-form-send-message u-form-send-success">
                        Thank you! Your message has been sent.
                        </div>
                        <div className="u-form-send-error u-form-send-message">
                        Unable to send your message. Please fix errors then try again.
                        </div>
                        <input type="hidden" value="" name="recaptchaResponse" />
                        <input type="hidden" name="formServices" value="2dbdd793-4186-c402-d481-27ed2a72ed2a" />
                    </form>
                    </div>
                    <div className="fr-view u-clearfix u-rich-text u-text u-text-3">
                    <h4>Sample Username:</h4>
                    <p>Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CommentSection;