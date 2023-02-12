import WorkIcon from '../../assets/img/work.png';
import AddressIcon from '../../assets/img/address.png'
import OfferIcon from '../../assets/img/offer.png'
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../CartItem/CartItem';
import { IMG_CDN_URL } from '../../constants';
import './Checkout.css';
import { useEffect, useState } from 'react';
import { getAddresses } from '../../services/fetch.service';
import { populateAddress } from '../../redux/addressSlice';

import * as _ from 'lodash';

export const Checkout = () => {

    const userId = process.env.HASURA_USER_ID;
    const [nocdOpted, setNocdOpted] = useState(false);
    const cartItems = useSelector(store => store.cart.items);
    const itemTotal = _
        .chain(cartItems)
        .map(({total}) => total)
        .sum()
        .value();
    const grandTotal = itemTotal + 33 + 11.45
    const {name, area, restrauntImageId} = useSelector(store => store.cart.restraunt);
    const {addresses} = useSelector(store => store.address);
    const dispatch = useDispatch();
    useEffect(() => {
        getMyAddress();
    },[])

    const getMyAddress = async() => {
        const response = await getAddresses(userId);
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
                    <div className='message'>
                        <strong>"</strong> <span>Any suggestions? We will pass it on...</span>
                    </div>
                    <div className='delivery-checkbox'>
                        <input type="checkbox" checked={nocdOpted} onClick={() => setNocdOpted(!nocdOpted)} />
                        <div>
                         <span>
                            <strong>Opt in for No-contact Delivery</strong><br></br>
                                {
                                    
                                    !nocdOpted 
                                    ? <>Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)</> 
                                    : <>Our delivery partner will call to confirm. Please ensure that your address has all the required details.</>
                                }
                        </span>
                        </div>
                    </div>
                    <div className='apply-coupon'>
                        <img src={OfferIcon}></img>
                        Apply Coupon
                    </div>
                    <div className='bill-section'>
                        <span>Bill Details</span>
                        <div className='item-total-section'>
                            <span>Item Total</span>
                            <span>{itemTotal}</span>
                        </div>
                        <div className='delivery-fee-section'>
                            <span>Delivery Fee | 5.0 kms</span>
                            <span>33</span>
                        </div>
                        <div className='taxes-section'>
                            <span>Govt Taxes & Other Charges</span>
                            <span>11.45</span>
                        </div>
                    </div>
                    <div className='total-section'>
                        <span>TO PAY</span>
                        <span>{grandTotal}</span>
                    </div>
                </div>
                <div className='bottom-section'>
                    <div className='policy-details'>
                        <strong>
                        Review your order and address details to avoid cancellations
                        </strong>
                        <p><span style={{color: 'red'}}>Note: </span> If you cancel within 60 seconds of placing your order, a 100% refund will be issued. No refund for cancellations made after 60 seconds.</p>
                        <span>Avoid cancellation as it leads to food wastage.</span>
                        <span className='cancellation-policy'>Read cancellation policy</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}