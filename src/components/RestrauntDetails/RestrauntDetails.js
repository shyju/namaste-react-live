import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as _ from 'lodash';

import {IMG_CDN_URL} from '../../constants';
import { Menu } from "../Menu/Menu";
import { Offers } from "../Offers/Offers";
import { Widget } from "../Widget/Widget";
import {MiniCart} from '../MiniCart/MiniCart';
import { useDispatch, useSelector } from "react-redux";
import { updateRestrauntDetails } from "../../redux/restrauntSlice";
import { addToFavourites, getAllFavourites, getRestaurantById, removeFavourite } from "../../services/fetch.service";
import { populateFavourites } from "../../redux/favouriteSlice";
import FavWhite from '../../assets/img/favourite-white.png';
import FavRed from '../../assets/img/favourite-red.png';
import './RestrauntDetails.css';

export const RestrauntMenu = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    const [widgetIndex, setWidgetIndex] = useState(0);
    const [cartStyle, setCartStyle] = useState("mini-cart");

    const isRestaurantFavourite = useSelector(store => _.findIndex(store.favourite?.favourites, ({restaurant: {id: restaurant_id}}) => restaurant_id === id) > -1) ?? false;
    const favouriteId = useSelector(store => _.find(store.favourite?.favourites, ({restaurant: {id}}) => id))?.id ?? '';
    const [isFavourite, setIsFavourite] = useState(isRestaurantFavourite);
    const userId = useSelector(store => store.user.user?.id);
    const restraunt = useSelector(store => store.restraunt.restrauntDetails);

    useEffect(() => {
        getRestrauntDetails()
    }, [id])

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

      const handleFavourite = async () => {
        isFavourite 
            ? await removeFavourite(favouriteId, userId) 
            : await addToFavourites(id, userId);
        setIsFavourite((prev) => !(prev));
        const favourites = await getAllFavourites(userId);
        dispatch(populateFavourites(favourites));
      }

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
                            <img src={IMG_CDN_URL + restraunt?.image_id} preload="true" />
                            <div className="restraunt-metadata">
                                <div className="name">
                                    {restraunt?.name}
                                    <img src={isFavourite ? FavRed : FavWhite} onClick={handleFavourite} preload="true" />
                                </div>
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
                    <div className="menu">

                        <Widget {...restraunt} widgetIndex = {widgetIndex} clickFunction={onWidgetClicked}></Widget>
                        <div className="menu-section">
                            <div className="menu-list">
                                <div className="selected-widget">
                                </div>
                                {
                                    _.values(restraunt?.restaurant_menus)?.map((item, index) => (
                                        <Menu {...item} key={index}></Menu>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={cartStyle}>
                            <MiniCart key="asda" cartStyle={cartStyle} name={restraunt?.name}></MiniCart>
                        </div>
                    </div>
                </div>
            )
    
};