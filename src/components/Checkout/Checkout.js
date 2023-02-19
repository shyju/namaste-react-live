import * as _ from 'lodash';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/Button';

import WorkIcon from '../../assets/img/work.png';
import AddressIcon from '../../assets/img/address.png'
import OfferIcon from '../../assets/img/offer.png'
import EmptyCart from '../../assets/img/EmptyCart.jpeg'
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../CartItem/CartItem';
import { IMG_CDN_URL } from '../../constants';
import './Checkout.css';
import { createPaymentIntent, getAddresses } from '../../services/fetch.service';
import { populateAddress } from '../../redux/addressSlice';

import { Payment } from '../Payment/Payment';
import { Address } from '../Modals/AddressModal/Address';
import { ToggleAddresssModal } from '../../redux/uiSlice';

const stripe_pk = process.env.STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(_.toString(stripe_pk));
export const Checkout = () => {

    
    const [clientSecret, setClientSecret] = useState('');
    const [nocdOpted, setNocdOpted] = useState(false);
    const [addressSelected, setAddressSelected] = useState(false);
    const [itemTotal, setItemTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [pageType, setpageType] = useState('new');
    const [addressId, setAddressId] = useState('');

    const userId = useSelector(store => store.user.user?.id);
    const cartItems = useSelector(store => store.cart.items);
    const {name, area, restaurantImageId} = useSelector(store => store.cart.restraunt);
    const {addresses} = useSelector(store => store.address);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        getMyAddress();
    },[])

    useEffect(() => {
        if (addressSelected) getClientSecret();
    }, [addressSelected])

    useEffect(() => {
        const total = _
        .chain(cartItems)
        .map(({total}) => total)
        .sum()
        .value() 

        const totalAmount = total + 33 + 11.45;

        setItemTotal(total)
        setGrandTotal(totalAmount)
    }, [cartItems])

    const getClientSecret = async () => {
        const {client_secret} = await createPaymentIntent({automatic_payment_methods: {enabled: true}});
        console.log('client_secret', client_secret);
        setClientSecret(client_secret);
    }

    const getMyAddress = async() => {
        const response = await getAddresses(userId);
        dispatch(populateAddress(response.addresses));
    }

    return (
        <>
            <Address pageType = {pageType} addressId = {addressId} />
            {cartItems.length 
            ? (
                <div className="checkout-container">
                 <div className='checkout'>
                    <div className="checkout-left-section">
                        <div className="address-section">
                            <div className="address-header" style={{display: addressSelected ? 'none' : ''}}>
                                <h3>Select delivery address</h3>
                                <span>You have a saved address in this location</span>
                            </div>
                            <div className="address-list">
                                {
                                    addresses?.map(({id, address_line_1, address_line_2, city, state, pincode, address_type}) => (
                                    <div className="address" style={{width: addressSelected ? '100%' : ''}}>
                                        <div className='icon'>
                                            <img src={WorkIcon}></img>
                                        </div>
                                        <div className="description">
                                            <h3 style={{textTransform:'capitalize'}}>{address_type}</h3>
                                            <span className='address-info'>{address_line_1}, {address_line_2},{city},{state}, {pincode}, India</span>
                                            <span className='delivery-time'>47 MINS</span>
                                            <div style={{display: 'flex'}}>
                                                <button onClick={() => setAddressSelected(true)} style={{display: addressSelected ? 'none' : ''}}>DELIVER HERE</button>
                                                <button onClick={() => {
                                                    setpageType('edit');
                                                    setAddressId(id);
                                                    dispatch(ToggleAddresssModal())
                                                    }} style={{display: addressSelected ? 'none' : ''}}>EDIT</button>
                                                <button onClick={() => setAddressSelected(false)} style={{display: addressSelected ? '' : 'none'}}>CHANGE</button>
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                }
                                
                                <div className="add-new-address" style={{display: addressSelected ? 'none' : 'flex'}}>
                                    <div className='icon'>
                                        <img src={AddressIcon}></img>
                                    </div>
                                    <div className='description'>
                                        <h3>Add New Address</h3>
                                        <span className='address-info'>kinfra film and video park,chantavila,near asinine school, 695585, India</span>
                                        <button onClick={() => dispatch(ToggleAddresssModal())}>ADD NEW</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='payment-section'>
                            <span>Payment</span>
                            {clientSecret && stripePromise && addressSelected && (
                                <Elements stripe={stripePromise} options={{clientSecret}}>
                                    <Payment className='payment' />
                                </Elements>
                            )}
                        </div>
                    </div>
                    <div className="checkout-right-section">
                        <div className='top-section'>
                            <div className='restraunt-info'>
                                <img src={IMG_CDN_URL + restaurantImageId}></img>
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
            : <>
                <div className='empty-cart' id="emptycart">
                        <img src={EmptyCart} />
                        <p>Your cart is empty</p>
                        <span>You can go to home page to view more restaurants</span>
                        <button onClick={() => navigate('/')}>See Restaurants near you</button>
                </div> 
            </>
        }
        </>
    )
}