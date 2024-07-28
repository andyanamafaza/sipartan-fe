import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsAuthenticatedWrap } from '../../hooks/wrapper/authentication';

export const NavBarNew = () => {

    const isAuthenticated = useIsAuthenticatedWrap();

    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname.substring(1));

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <nav className="navbar navbar-expand-sm bg-body-tertiary sticky-top shadow">
            <div className="container-fluid">
                <img className='navbar-img me-3' src="/img/logo_sipartan.png" alt="logo" />
                <a className="navbar-brand" href="#" style={{ whiteSpace: "normal" }}>
                    <span className='d-none d-xl-block'>Sistem Penilaian Tingkat Keparahan Area Pasca Karhutla (SIPARTAN)</span>
                    <span className='d-xl-none'>SIPARTAN</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto align-items-center text-center">
                        <li className="nav-item me-2">
                            <Link
                                to="/"
                                className={`nav-link ${activeLink === '' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('')}
                            >
                                BERANDA
                            </Link>

                        </li>
                        {isAuthenticated() ? (
                            <>
                                <li className="nav-item me-2">
                                    <Link
                                        to="/tambah-data"
                                        className={`nav-link ${activeLink === 'tambah-data' ? 'active' : ''}`}
                                        onClick={() => handleLinkClick('tambah-data')}
                                    >
                                        TAMBAH DATA
                                    </Link>
                                </li>
                                <li className="nav-item me-2">
                                    <Link
                                        to="/profile"
                                        className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`}
                                        onClick={() => handleLinkClick('profile')}
                                    >
                                        PROFIL
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item me-2">
                                <Link
                                    to="/login"
                                    className={`nav-link ${activeLink === 'login' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('login')}
                                >
                                    LOGIN
                                </Link>
                            </li>
                        )}

                        {/* <li className="nav-item dropdown me-2">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                MANAJEMEN PENGGUNA
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                            </ul>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};