
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';

import Logo from '../../assets/img/foodvilla.png'
import './Header.css'
import { populateCart, populateRestaurant } from '../../redux/cartSlice';
import {getCartItems} from '../../services/fetch.service';
import { Logout } from '../../redux/userSlice';
import { AuthLogout } from '../../auth/auth-config';
import MenuIcon from '../../assets/img/hamburger.png';

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
    const user_id = useSelector(store => store.user?.user?.id);
    const picture = useSelector(store => store.user?.user?.picture);

    const [showNavMenu, setShowNavMenu] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);

    const handleResize = () => {
        const {innerWidth, innerHeight} =  window;
        if (width > 925) {
            setShowNavMenu(true);
        } else if (width <= 925) {
            setShowNavMenu(false)
        }
        setWidth(innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [width])

    useEffect(() => {
        getCartList();
    }, [user_id]);

    const getCartList = async () => {
        const {restaurant, cart} = await getCartItems(user_id);
        dispatch(populateCart(cart));
        dispatch(populateRestaurant(restaurant));
    }

    const handleLogout = async() => {
        const response = await AuthLogout();
        dispatch(Logout())
    }
   return (
    <div className="header" style={{marginBottom: showNavMenu && width <= 925 ? '30px' : ''}}>
        <Title/>
        <div className='header-right'>
            <div className="nav-items" style={{display: showNavMenu && (width <= 925 || width > 925) ? 'flex' : 'none'}}>
                <ul>
                    <li>
                        <Link to="/" className='text-link'>Home</Link>
                    </li>
                    {/* <li>
                        <Link to="/about" className='text-link'>About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className='text-link'>Contact</Link>
                    </li> */}
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
            <div className='profile-pic'>
                <img src={picture} alt="" />
            </div>
            <div className='menu-icon' onClick={() => setShowNavMenu(!showNavMenu)}>
                <img src={MenuIcon} />
            </div>
        </div>
    </div>
   )
}
