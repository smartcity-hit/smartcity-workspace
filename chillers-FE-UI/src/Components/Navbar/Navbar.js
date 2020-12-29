import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { signOutUser } from '../../actions/user';

import './Navbar.scss';

const Navbar = () => {

    const history = useHistory();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDocumentClick = useCallback((e) => {
        if (isDropdownOpen && e.target.id !== 'user-btn-label') {
            setIsDropdownOpen(false);
        }
    }, [isDropdownOpen]);

    useEffect(() => {
        document.body.addEventListener('click', handleDocumentClick);
        return (() => {
            document.body.removeEventListener('click', handleDocumentClick);
        });
    }, [handleDocumentClick])

    const toggleUserDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const onClickSignOut = () => {
        dispatch(signOutUser());
    }

    const { userType, fullName } = userData;

    return (
        <div className="navbar-container">
            <div className="nav-logo" onClick={() => history.push('/')}>
                H.I.T
            </div>
            <ul className="nav-links">
                <li className={`nav-link ${pathname.includes('waterCircuit') ? 'active' : ''}`}>
                    <Link to="/waterCircuit" className="nav-link-text">Water circuit</Link>
                </li>
                <li className={`nav-link ${pathname.includes('coolingCircuit') ? 'active' : ''}`}>
                    <Link to="/coolingCircuit" className="nav-link-text">Cooling circuit</Link>
                </li>
                <li className={`nav-link last ${pathname.includes('chillerHistory') ? 'active' : ''}`}>
                    <Link to="/chillerHistory" className="nav-link-text">Chiller History</Link>
                </li>
            </ul>
            <div className="menu-dropdown">
                <div className="user-btn" onClick={toggleUserDropdown}>
                    <label id="user-btn-label">{fullName} {isDropdownOpen ? '\u2191' : '\u2193'}</label>
                </div>
                <ul className={`user-dropdown-list ${!isDropdownOpen ? 'hidden' : ''} ${userType !== 1 ? 'short' : ''}`}>
                    {userType === 1 ?
                        <React.Fragment>
                            <li className='user-dropdown-item' onClick={() => history.push('/adminPanel')}>Admin Panel</li>
                            <hr />
                        </React.Fragment> : ''}
                    <li className='user-dropdown-item' onClick={onClickSignOut}>Sign Out</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar; 
