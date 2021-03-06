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
                    {(connectedUser.role === 'client') ?
                    <NavLink to="/dashboard/favourites">
                        Favourites
                    </NavLink> :null}
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
                    {(connectedUser.role === 'client') ?
                    <NavLink to="/dashboard/cart">
                        Shopping Cart
                    </NavLink> 
                    : null }
                    {(connectedUser.role === 'client') ?
                    <NavLink to="/dashboard/orders">
                        Orders
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
