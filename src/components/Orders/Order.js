import { useSelector } from "react-redux";

import { OrderList } from "../OrderList/OrderList";
import './Order.css';

export const Order = () => {

    const orders = useSelector(store => store?.order?.orders);
    return (
        <div className="order-container"> 

            {
                orders?.length > 0 && orders?.map((order, index) => <OrderList {...order} key={index} index={index + 1}/>)
            }
            
        </div>
    )
}