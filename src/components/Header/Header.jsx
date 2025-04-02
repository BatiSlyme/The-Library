import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <header className="u-clearfix u-header u-header" id="sec-2de6">
                <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
                    <nav className="u-menu u-menu-one-level u-offcanvas u-menu-1">
                    <div className="menu-collapse" style={{ fontSize: '1rem', letterSpacing: '0px' }}>
                        <a className="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-hamburger-link u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
                        <svg className="u-svg-link" viewBox="0 0 24 24">
                            <use xlinkHref="#menu-hamburger"></use>
                        </svg>
                        <svg className="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                            <g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect></g>
                        </svg>
                        </a>
                    </div>
                    <div className="u-custom-menu u-nav-container">
                        <ul className="u-nav u-unstyled u-nav-1">
                        <li className="u-nav-item"><Link className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" to="/" style={{ padding: '13px 27px' }}>Home</Link></li>
                        <li className="u-nav-item"><Link className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" to="/login" style={{ padding: '13px 27px' }}>Login</Link></li>
                        <li className="u-nav-item"><Link className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" to="/register" style={{ padding: '13px 27px' }}>Register</Link></li>
                        <li className="u-nav-item"><Link className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" to="/user-profile" style={{ padding: '13px 27px' }}>User Profile</Link></li>
                        <li className="u-nav-item"><Link className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" to="/personal-library" style={{ padding: '13px 27px' }}>Personal Library</Link></li>
                        <li className="u-nav-item"><Link className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" to="/catalogue" style={{ padding: '13px 25px' }}>Catalogue</Link></li>
                        <li className="u-nav-item"><Link className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" to="/about" style={{ padding: '13px 25px' }}>About</Link></li>
                        </ul>
                    </div>
                    </nav>
                    <h2 className="u-text u-text-default u-text-1">THE LIBRARY</h2>
                    <nav className="u-menu u-menu-one-level u-offcanvas u-menu-3">
                    <div className="menu-collapse">
                        <a className="u-button-style u-hamburger-link u-nav-link" aria-label="Open menu" aria-controls="627f" href="#">
                        <svg className="u-svg-link" viewBox="0 0 24 24">
                            <use xlinkHref="#svg-9aa7"></use>
                        </svg>
                        <svg className="u-svg-content" version="1.1" id="svg-9aa7" viewBox="0 0 16 16" x="0px" y="0px" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                            <g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect></g>
                        </svg>
                        </a>
                    </div>
                    <div className="u-custom-menu u-nav-container"></div>
                    <div id="627f" role="region" aria-label="Menu panel" className="u-custom-menu u-nav-container-collapse">
                        <div className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                        <div className="u-inner-container-layout u-sidenav-overflow">
                            <div className="u-menu-close" aria-label="Close menu"></div>
                            <ul className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-5">
                            <li className="u-nav-item"><Link className="u-button-style u-nav-link" to="/" >Home</Link></li>
                            <li className="u-nav-item"><Link className="u-button-style u-nav-link" to="/about">About</Link></li>
                            <li className="u-nav-item"><Link className="u-button-style u-nav-link" to="/catalogue">Catalogue</Link></li>
                            </ul>
                        </div>
                        </div>
                        <div className="u-black u-menu-overlay u-opacity u-opacity-70"></div>
                    </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header;