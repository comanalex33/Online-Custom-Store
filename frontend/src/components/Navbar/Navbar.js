import React from 'react'
import { useHistory } from 'react-router';
import {
    Nav,
    NavLink,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

const Navbar = ({connectedUser}) => {

    const history = useHistory()

    const handleLogOut = event => {
        history.push('/login');
        window.location.reload();
    }

    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/dashboard">
                        Home
                    </NavLink>
                    <NavLink to="/dashboard/products">
                        Products
                    </NavLink>
                    <NavLink to="/dashboard/favourites">
                        Favourites
                    </NavLink>
                    <NavLink to="/dashboard/faqs">
                        Faqs
                    </NavLink>
                    <NavLink to="/dashboard/profile">
                        Profile
                    </NavLink>
                    {(connectedUser.role === 'admin') ?
                    <NavLink to="/dashboard/requests">
                        Requests
                    </NavLink> 
                    : null }
                </NavMenu>
                <NavBtn>
                    <NavBtnLink onClick={handleLogOut}>Log Out</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar
