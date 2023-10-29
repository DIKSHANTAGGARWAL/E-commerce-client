import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LogoutIcon from '@mui/icons-material/Logout';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { alignProperty } from "@mui/material/styles/cssUtils";
import { AlignHorizontalRight } from "@mui/icons-material";

const Nav = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }

    return (
        <div className="nav">
            <img alt="d.a.r.k"
                className="logo nav-left"
                src="https://avatars.githubusercontent.com/u/105876150?s=280&v=4" />
            {auth ?
                <>
                    {/* <div className="navbar"> */}

                    <div className="nav-ul nav-left navbar" >
                        <Link className='nav-operation' to="/products">Product <ProductionQuantityLimitsIcon /></Link>
                        <Link className='nav-operation' to="/add">Add product <AddIcon /></Link>
                        <Link className='nav-operation' to="/cart">Cart<ShoppingCartCheckoutIcon /></Link>
                        <Link className='nav-operation' onClick={logout} to="/signup">Logout({JSON.parse(auth).name}) <LogoutIcon /></Link>
                    </div>
                    {/* </div> */}
                </>
                :
                <ul className="nav-ul nav-right navbar" >
                    <li><Link to="/signup">Signnn</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;