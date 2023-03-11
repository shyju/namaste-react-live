import { InfoCard } from "./InfoCard/InfoCard";
import * as _ from 'lodash';
import moment from 'moment';

import RestaurantIcon from './../assets/img/restaurant.png';
import OrderIcon from './../assets/img/checklist.png';
import OrderCompletedIcon from './../assets/img/package-delivered.png';
import OrderCancelledIcon from './../assets/img/order-cancelled.png';
import SoldIcon from './../assets/img/sold.png';
import './Admin.css';
import { BumpChart } from "./Charts/BumpChart/BumpChart";
import { useEffect, useState } from "react";
import { getGraphStatistics, getStatistics } from "./service/admin-fetch.service";
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
        const getStatisticsData = async () => {
            const {foodvilla_statistics} = await getStatistics();
            const generatedData = buildData(foodvilla_statistics);
            setStatistics(generatedData);
        }
        const getGraphStatisticsData = async () => {
            const {foodvilla_graph_Stats} = await getGraphStatistics();
            const {orders_graph_data, sales_graph_data} = buildGraphData(foodvilla_graph_Stats);
            setOrderStatistics(orders_graph_data);
            setSaleStatistics(sales_graph_data);
        }
        getStatisticsData();
        getGraphStatisticsData();
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
            orders_graph_data: [{id: 'Orders', data: _.map(data, ({orders_count, created_at}) => ({
                x: moment.utc(created_at).local().format('MM-DD-YY'), 
                y: orders_count
            }))}],
            sales_graph_data: [{id: 'Sales', data: _.map(data, ({sales_count, created_at}) => ({
                x: moment.utc(created_at).local().format('MM-DD-YY'), y: sales_count
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
                        <BumpChart data={orderStatistics} legends= {{xlegend: 'Date & Time', ylegend: 'orders'}} />
                    </div>
                    <div className="bump-chart">
                        <h3>Sales across time period</h3>
                        <BumpChart data={saleStatistics} legends= {{xlegend: 'Date & Time', ylegend: 'sales'}}/>
                    </div>
                </div>
                {/* <div className="pie-chart">
                    <PieChart data={pieData} />
                </div> */}
            </div>
            
        </div>
    )
}