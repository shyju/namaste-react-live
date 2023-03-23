import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as _ from 'lodash';

import { populateCart, populateRestaurant } from "../../redux/cartSlice";
import { clearCart, createOrder, getAllOrders, getCartItems, insertOrderItems } from "../../services/fetch.service";
import { TogglePaymentSuccessModal } from "../../redux/uiSlice";
import { populateOrders } from "../../redux/orderSlice";
import './Payment.css';

export const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);

    const cartItems = useSelector(store => store.cart?.items);
    const restaurantDetails = useSelector(store => store.cart?.restraunt);
    const userId = useSelector(store => store.user?.user?.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            // confirmParams: {
            //     return_url: `${window.location.origin}/completion`,
            // },
            redirect: 'if_required'
        });
        console.log('paymentIntent:', JSON.stringify(paymentIntent));
        if (error) {
            toast.warn(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            const createOrderPayload = {
                payment_id: paymentIntent.id,
                total: 0,
                user_id: userId,
                restaurant_id: restaurantDetails.id
            }
            const createOrderResponse = await createOrder(createOrderPayload, userId);
            const orderItems = _.map(cartItems, ({menu_id, quantity}) => ({
                order_id: createOrderResponse.id,
                product_id: menu_id,
                quantity
            }))
            await insertOrderItems({orderItems}, userId);
            await clearCart(userId);
            const {restaurant, cart} = await getCartItems(userId);
            const orders = await getAllOrders(userId);
            dispatch(populateOrders(orders));
            dispatch(TogglePaymentSuccessModal());
            dispatch(populateCart(cart));
            dispatch(populateRestaurant(restaurant));
            navigate('/completion');
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
        </form>
    )
}