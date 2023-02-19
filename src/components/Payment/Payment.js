import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-modal';

import { populateCart, populateRestaurant } from "../../redux/cartSlice";
import { clearCart, getCartItems } from "../../services/fetch.service";
import './Payment.css';
import { ToggleModal } from "../../redux/uiSlice";

export const Payment = () => {

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();

    const userId = useSelector(store => store.user?.user?.id);

    const handleSubmit = async (e) => {
        setMessage('');
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/`,
            },
            redirect: 'if_required'
        });
        console.log('paymentIntent:', JSON.stringify(paymentIntent));
        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage(`Payment status: ${paymentIntent.status}`);
            await clearCart(userId);
            const {restaurant, cart} = await getCartItems(userId);
            dispatch(ToggleModal());
            dispatch(populateCart(cart));
            dispatch(populateRestaurant(restaurant));
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className='payment'>
            <PaymentElement />
            <button disabled={isProcessing || !stripe || !elements}>
                <span>
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div className="payment-message">{message}</div>}
        </form>
    )
}