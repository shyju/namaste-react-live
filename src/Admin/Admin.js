import * as _ from 'lodash';
import moment from 'moment';
import { useEffect, useState } from "react";

import { getGraphStatistics, getStatistics } from "./service/admin-fetch.service";
import { LineChart } from "./Charts/LineChart/LineChart";
import { InfoCard } from "./InfoCard/InfoCard";
import RestaurantIcon from './../assets/img/restaurant.png';
import OrderIcon from './../assets/img/checklist.png';
import OrderCompletedIcon from './../assets/img/package-delivered.png';
import OrderCancelledIcon from './../assets/img/order-cancelled.png';
import SoldIcon from './../assets/img/sold.png';
import './Admin.css';

export const Admin = () => {

    const infoCards = ['RESTAURANTS', 'ORDERS', 'CANCELLED ORDERS', 'COMPLETED ORDERS', 'ITEMS SOLD']

    const icons = {
        'RESTAURANTS': RestaurantIcon,
        'ORDERS': OrderIcon,
        'CANCELLED ORDERS': OrderCancelledIcon,
        'COMPLETED ORDERS': OrderCompletedIcon,
        'ITEMS SOLD': SoldIcon
    }

    const [statistics, setStatistics] = useState([]);
    const [orderStatistics, setOrderStatistics] = useState([]);
    const [saleStatistics, setSaleStatistics] = useState([]);
    useEffect (() => {
        Promise.all([
            getStatistics(),
            getGraphStatistics()
          ]).then(([{foodvilla_statistics}, {foodvilla_graph_Stats}]) => {
            const generatedData = buildData(foodvilla_statistics);
            const {orders_graph_data, sales_graph_data} = buildGraphData(foodvilla_graph_Stats);
            setStatistics(generatedData);
            setOrderStatistics(orders_graph_data);
            setSaleStatistics(sales_graph_data);
          });
    }, [])

    const buildData = (data) => {
        return _
            .chain(data)
            .filter(({metric_name}) => _.includes(infoCards, metric_name))
            .sortBy(({metric_name}) => _.indexOf(infoCards, metric_name))
            .map(({metric_name: name, metric_value: count}) => ({
                name,
                count,
                img_src: icons[name]
            }))
            .value();
    }

    const buildGraphData = (data) => {
        return {
            orders_graph_data: [{id: 'Orders', data: _.map(data, ({orders_count, order_date}) => ({
                x: moment.utc(order_date).local().format('MM-DD-YY'), 
                y: orders_count
            }))}],
            sales_graph_data: [{id: 'Sales', data: _.map(data, ({sales_count, order_date}) => ({
                x: moment.utc(order_date).local().format('MM-DD-YY'), y: sales_count
            }))}]
        }
    }

    return (
        <div className="admin-container">
            <div className="overview">
                    <h3>Overview</h3>
                    <div style={{display: 'flex', marginTop: '20px'}}>
                    {statistics?.map((statistic, index) => <InfoCard key={index} {...statistic}/>)}
                    </div>
            </div>
            <div className="report">
                {/* <InfoCard {...info} /> */}
                <h3>Report</h3>
                <div style={{display: 'flex', width: 'auto'}}>
                    <div className="bump-chart">
                        <h3>Orders across time period</h3>
                        <LineChart data={orderStatistics} legends= {{xlegend: 'Date & Time', ylegend: 'orders'}} />
                    </div>
                    <div className="bump-chart">
                        <h3>Sales across time period</h3>
                        <LineChart data={saleStatistics} legends= {{xlegend: 'Date & Time', ylegend: 'sales'}}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}