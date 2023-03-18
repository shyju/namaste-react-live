import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import * as _ from 'lodash';
import moment from 'moment';

import { IMG_CDN_URL } from '../../constants';
import CompleteIcon from '../../assets/img/accept.png';
import PendingIcon from '../../assets/img/time.png';
import './OrderList.css';

export const OrderList = ({restaurant: {id, name, image_id, area}, order_items, created_at, order_state, index}) => {
    const navigate = useNavigate();

    const [itemString, setItemString] = useState('');
    const [total, setTotal] = useState('');
    const [orderTime, setOrderTime] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');

    useMemo(() => {
        const itemString = _.reduce(order_items, (sum, {quantity, menu: {name}}, index) => {
            sum = sum + name + ' X ' + quantity + (index < order_items.length - 1 ? ', ': '');
            return sum;
        }, '');
        
        const total =  _.reduce(order_items, (sum, {quantity, menu: {price}}) => {
            sum = sum + ((price * quantity) / 100)
            return sum;
        }, 0)

        const formattedOrderTime = moment.utc(created_at).local().format('ddd, MMM D, YYYY, hh:mm A');
        const deliveryTimestamp = moment(created_at).add(30, 'minutes');
        const formattedDeliveryTime = moment.utc(deliveryTimestamp).local().format('ddd, MMM D, YYYY, hh:mm A')

        setOrderTime(formattedOrderTime);
        setDeliveryTime(formattedDeliveryTime);
        setItemString(itemString);
        setTotal(total);
    }, [])
    return (
        <div className='order-list-container'>
            <div className='restaurant'>
                <div className='restaurant-details'>
                    <img src={IMG_CDN_URL + image_id} onClick={()=> navigate(`/restraunt/${id}`)}/>
                    <div className='restaurant-info'>
                        <h3 style={{cursor: 'pointer'}} onClick={() => navigate(`/restraunt/${id}`)}>{name}</h3>
                        <span>{area}</span>
                        <span>{`#00012345${index} | ${orderTime}`}</span>
                    </div>
                </div>
                {
                    order_state === 'COMPLETED' 
                    ? (
                        <>
                            <h4>{`DELIVERED ON ${deliveryTime}`}</h4>
                            <img className='checked-icon' src={CompleteIcon} />
                        </>
                    )
                    : (
                        <>
                            <h4>{order_state}</h4>
                            <img className='checked-icon' src={PendingIcon} />
                        </>
                    )
                }

            </div>
            {
                <div className='cart'>
                        <h3>{itemString}</h3>
                        <h3>{'Total Paid: ₹' +  total}</h3>
                </div>
            }
        </div>
    )
}