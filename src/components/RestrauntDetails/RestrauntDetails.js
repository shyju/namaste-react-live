import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {IMG_CDN_URL} from '../../constants';
import * as _ from 'lodash';
import { Menu } from "../Menu/Menu";
import { Offers } from "../Offers/Offers";
import { Widget } from "../Widget/Widget";
import {MiniCart} from '../MiniCart/MiniCart';
import { useDispatch, useSelector } from "react-redux";
import { updateRestrauntDetails } from "../../redux/restrauntSlice";
import { getRestaurantById } from "../../services/fetch.service";
import './RestrauntDetails.css';

export const RestrauntMenu = () => {

    const {id} = useParams();

    useEffect(() => {
        getRestrauntDetails();
    }, [id])

    const [widgetIndex, setWidgetIndex] = useState(0);
    const [cartStyle, setCartStyle] = useState("mini-cart");

    const restraunt = useSelector(store => store.restraunt.restrauntDetails);
    const dispatch = useDispatch();

    const listenScrollEvent = (event) => {
        if (window.scrollY < 73) {
            setCartStyle("mini-cart");
            return; 
        } else if (window.scrollY > 70) {
            setCartStyle("mini-cart-scroll");
            return; 
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
      
        return () =>
          window.removeEventListener('scroll', listenScrollEvent);
      }, []);

    async function getRestrauntDetails() {
        const restaurant = await getRestaurantById(id);
        dispatch(updateRestrauntDetails(restaurant));
    }

    const onWidgetClicked = (index) => {
        setWidgetIndex(index);
    }

    return (restraunt?.length === 0 )
            ? <></>
            : (
                <div className="restraunt-container">
                    <div className="restraunt-details">
                        <div className="details-header">
                            <img src={IMG_CDN_URL + restraunt?.image_id} />
                            <div className="restraunt-metadata">
                                <div className="name">{restraunt?.name}</div>
                                {/* <div className="sub-details">{restraunt?.restraunt_cuisinescuisines?.join(', ')}</div> */}
                                <div className="sub-details">{restraunt?.area}</div>
                                <div className="ratings-time-cost">
                                    <div>
                                        <span className="icon-star">
                                            {/* <FontAwesomeIcon icon={faStar} /> */}
                                            {restraunt?.rating}
                                        </span>
                                        <span>{restraunt?.total_rating}</span>
                                    </div>
                                    <div>
                                        <span>{restraunt?.delivery_time} mins</span>
                                        <span>Delivery Time</span>
                                    </div>
                                    <div>
                                        <span>{ '₹ ' + restraunt?.price / 100}</span>
                                        <span>Cost for two</span>
                                    </div>
                                </div>
                            </div>
                            <Offers key={restraunt?.id} {...restraunt}></Offers>
                        </div>
                    </div>
                    {/* <div className="search-filter">
                        <input type="search" placeholder="Search for dishes..."></input>
                        <div>
                            <span>Veg Only</span>
                        </div>
                        <div><span>Favourite</span></div>
                    </div> */}
                    <div className="menu">

                        <Widget {...restraunt} widgetIndex = {widgetIndex} clickFunction={onWidgetClicked}></Widget>
                        <div className="menu-section">
                            <div className="menu-list">
                                <div className="selected-widget">
                                    {/* <span>{restraunt?.menu?.widgets[widgetIndex]?.name}</span>
                                    <span>{restraunt?.menu?.widgets[widgetIndex]?.entities?.length} ITEMS</span> */}
                                </div>
                                {
                                    _.values(restraunt?.restaurant_menus)?.map((item, index) => (
                                        <Menu {...item} key={index}></Menu>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={cartStyle}>
                            <MiniCart key="asda" name={restraunt?.name}></MiniCart>
                        </div>
                    </div>
                </div>
            )
    
};