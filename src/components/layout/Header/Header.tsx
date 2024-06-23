import { useEffect, useState } from 'react';
import './Header.scss';
import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
    const { pathname } = useLocation()
    const [isProfile, setIsProfile] = useState(false);
    useEffect(() => {
        const userData = localStorage.getItem('userData')
        if (userData) {
            setIsProfile(true)
            return
        }

        setIsProfile(false)
    }, [pathname])

    return (
        <header className="header">
            <div className="logo">
                <a href="/">Logo</a>
                {/* <img src="logo.png" alt="" /> */}
            </div>
            <nav className="nav">
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-link ${isActive && 'active-link'}`}
                >
                    Home
                </NavLink>

                {isProfile ? (
                    <NavLink
                        to="/products"
                        className={({ isActive }) => `nav-link ${isActive && 'active-link'}`}
                    >
                        Products
                    </NavLink>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) => `nav-link ${isActive && 'active-link'}`}
                    >
                        Login
                    </NavLink>
                )}
            </nav>
        </header>
    );
};
