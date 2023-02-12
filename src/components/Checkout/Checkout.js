import WorkIcon from '../../assets/img/work.png';
import AddressIcon from '../../assets/img/address.png'
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../CartItem/CartItem';
import { IMG_CDN_URL } from '../../constants';
import './Checkout.css';
import { useEffect } from 'react';
import { getAddresses } from '../../services/fetch.service';
import { populateAddress } from '../../redux/addressSlice';

export const Checkout = () => {

    const cartItems = useSelector(store => store.cart.items);
    const {name, area, restrauntImageId} = useSelector(store => store.cart.restraunt);
    const {addresses} = useSelector(store => store.address);
    const dispatch = useDispatch();
    useEffect(() => {
        getMyAddress();
    },[])

    const getMyAddress = async() => {
        const response = await getAddresses("0612f2b7-e254-4255-baed-c4cc34590564");
        dispatch(populateAddress(response.addresses));
    }
    return (
        <div className="checkout-container">
            <div className='checkout'>
            <div className="checkout-left-section">
                <div className="address-section">
                    <div className="address-header">
                        <h3>Select delivery address</h3>
                        <span>You have a saved address in this location</span>
                    </div>
                    <div className="address-list">
                        {
                            addresses?.map(({address_line_1, address_line_2, city, state, pincode}) => (
                            <div className="address">
                                <div className='icon'>
                                    <img src={WorkIcon}></img>
                                </div>
                                <div className="description">
                                    <h3>Work</h3>
                                    <span className='address-info'>{address_line_1}, {address_line_2},{city},{state}, {pincode}, India</span>
                                    <span className='delivery-time'>47 MINS</span>
                                    <button>DELIVER HERE</button>
                                </div>
                            </div>
                            ))
                        }
                        
                        <div className="add-new-address">
                            <div className='icon'>
                                <img src={AddressIcon}></img>
                            </div>
                            <div className='description'>
                                <h3>Add New Address</h3>
                                <span className='address-info'>kinfra film and video park,chantavila,near asinine school, 695585, India</span>
                                <button>ADD NEW</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='payment-section'>
                    <span>Payment</span>
                </div>
            </div>
            <div className="checkout-right-section">
                <div className='top-section'>
                    <div className='restraunt-info'>
                        <img src={IMG_CDN_URL + restrauntImageId}></img>
                        <div>
                            <span>{name}</span>
                            <span>{area}</span>
                        </div>
                        
                    </div>
                    <div className='cart-details'>
                    {
                        cartItems?.map(cartItem => <CartItem {...cartItem} key={cartItem.id} />)
                    }
                    </div>
                </div>
                <div className='bottom-section'></div>
            </div>
            </div>
        </div>
    )
}