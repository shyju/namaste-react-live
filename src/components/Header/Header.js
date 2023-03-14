
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';

import Logo from '../../assets/img/foodvilla.png'
import DownArrow from '../../assets/img/down-arrow.png';
import './Header.css'
import { populateCart, populateRestaurant } from '../../redux/cartSlice';
import {getAllFavourites, getAllOrders, getCartItems} from '../../services/fetch.service';
import { Logout } from '../../redux/userSlice';
import { AuthLogout } from '../../auth/auth-config';
import { populateOrders } from '../../redux/orderSlice';
import { populateFavourites } from '../../redux/favouriteSlice';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const Title = () => (
    <Link to='/home'>
        <img 
            className='logo' 
            alt="Logo" 
            src={Logo}>
        </img>
    </Link>
)

export const HeaderComponent = ({name}) => {

    const dispatch = useDispatch();
    const {id: user_id = '', picture = '', nickname = ''} = useSelector(store => store.user?.user) ?? {};

    useEffect(() => {
        getCartList();
        getMyOrders();
        getMyFavourites();
    }, [user_id]);

    const getCartList = async () => {
        const {restaurant, cart} = await getCartItems(user_id);
        dispatch(populateCart(cart));
        dispatch(populateRestaurant(restaurant));
    }

    const getMyOrders = async () => {
        const orders = await getAllOrders(user_id);
        dispatch(populateOrders(orders));
    }

    const getMyFavourites = async () => {
        const favourites = await getAllFavourites(user_id);
        dispatch(populateFavourites(favourites));
    }

    const handleLogout = async() => {
        const response = await AuthLogout();
        dispatch(Logout())
    }
   return (
    <div className="header">
        <Title/>
        <div className='header-right'>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/home" className='text-link'>Home</Link>
                    </li>
                    {/* <li>
                        <Link to="/about" className='text-link'>About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className='text-link'>Contact</Link>
                    </li> */}
                    <li>
                        <Link to="/my-account" className='text-link'>My Account</Link>
                    </li>
                    <li>
                        <Link to="/checkout" className='text-link'>Cart</Link>
                    </li>
                    {/* <li>
                        <Link to="/" className='text-link' onClick={handleLogout}>
                            Logout
                        </Link>
                    </li> */}
                </ul>
            </div>
            <div className='profile-pic'>
                <img src={picture} alt="" title={nickname.toUpperCase()}/>
                <OverlayTrigger 
                        trigger='click'
                        key='bottom'
                        placement='bottom'
                        arrowOffset={20}
                        rootClose={true}
                        arrowProps={{ style: { backgroundColor: 'white' } }}
                        overlay={
                            <Popover style={{ padding: '10px' }}>
                            <Popover.Body>
                                <strong style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</strong>
                            </Popover.Body>
                            </Popover>
                        }
                        >
                        <div style={{marginLeft: '5px', fontWeight: '500', cursor: 'pointer'}}>
                            <span>Hey, {nickname} !</span>
                            <img style={{height: '20px',  'marginLeft': '5px'}} src={DownArrow} />
                        </div>
                    </OverlayTrigger>
            </div>
        </div>
    </div>
   )
}
