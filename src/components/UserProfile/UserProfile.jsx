function UserProfile() {
    return (
        <>
            <section className="u-align-center u-clearfix u-container-align-center u-grey-5 u-section-4" id="sec-9690">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <h1 className="u-text u-text-1">Profile</h1>
                    <p className="u-large-text u-text u-text-variant u-text-2">Hunter Norton</p>

                    <div className="data-layout-selected u-clearfix u-layout-wrap u-layout-wrap-1">
                    <div className="u-gutter-0 u-layout">
                        <div className="u-layout-col">

                        {/* Profile Image */}
                        <div className="u-align-center u-container-align-center u-container-style u-layout-cell u-size-20">
                            <div className="u-container-layout u-valign-middle">
                            <div className="u-image u-image-circle u-image-1" style={{ backgroundImage: "url('/images/profile.jpg')" }}></div>
                            </div>
                        </div>

                        {/* About Me Section */}
                        <div className="u-align-center u-container-align-center u-container-style u-layout-cell u-size-20 u-white">
                            <div className="u-container-layout u-valign-middle">
                            <h4 className="u-text">About me</h4>
                            <p className="u-text">
                                I am an all-around web developer. I am a senior programmer with good knowledge of front-end techniques. 
                                Vitae sapien pellentesque habitant morbi tristique senectus et. Aenean sed adipiscing diam donec adipiscing tristique risus.
                            </p>
                            </div>
                        </div>

                        {/* Personal Library Section */}
                        <div className="u-align-center u-container-align-center u-container-style u-layout-cell u-size-20">
                            <div className="u-container-layout">
                                <h4 className="u-text">Personal Library</h4>
                                <p className="u-text">
                                    <strong>Name:</strong> Hunter Norton <br />
                                    <strong>Age:</strong> 33 years <br />
                                    <strong>Location:</strong> 's-Hertogenbosch, The Netherlands, Earth
                                </p>
                            </div>
                        </div>

                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserProfile;