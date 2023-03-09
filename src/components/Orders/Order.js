import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { populateOrders } from "../../redux/orderSlice";
import { getAllOrders } from "../../services/fetch.service";
import { OrderList } from "../OrderList/OrderList";
import './Order.css';

export const Order = () => {

    const orders = useSelector(store => store?.order?.orders);
    return (
        <div className="order-container"> 

            {
                orders?.length && orders?.map((order, index) => <OrderList {...order} key={index} index={index + 1}/>)
            }
            
        </div>
    )
}