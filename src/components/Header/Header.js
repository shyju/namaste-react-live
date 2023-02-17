
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';

import Logo from '../../assets/img/foodvilla.png'
import './Header.css'
import { populateCart, populateRestaurant } from '../../redux/cartSlice';
import {getCartItems} from '../../services/fetch.service';
import { logout } from '../../redux/userSlice';
import { AuthLogout } from '../../auth/auth-config';

const Title = () => (
    <Link to='/'>
        <img 
            className='logo' 
            alt="Logo" 
            src={Logo}>
        </img>
    </Link>
)

export const HeaderComponent = ({name}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        getCartList();
    }, []);

    const getCartList = async () => {
        const {restaurant, cart} = await getCartItems();
        dispatch(populateCart(cart));
        dispatch(populateRestaurant(restaurant));
    }

    const handleLogout = async() => {
        const response = await AuthLogout();
        dispatch(logout())
    }
   return (
    <div className="header">
        <Title/>
        <div className="nav-items">
            <ul>
                <li>
                    <Link to="/" className='text-link'>Home</Link>
                </li>
                <li>
                    <Link to="/about" className='text-link'>About</Link>
                </li>
                <li>
                    <Link to="/contact" className='text-link'>Contact</Link>
                </li>
                <li>
                    <Link to="/checkout" className='text-link'>Cart</Link>
                </li>
                <li>
                    <Link to="/" className='text-link' onClick={handleLogout}>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    </div>
   )
}
