import {RestrauntCard} from '../RestrauntCard/RestrauntCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as _ from 'lodash';
import { Shimmer } from '../Shimmer/Shimmer';
import { updateRestrauntList } from '../../redux/restrauntSlice';

const filterData = (searchText, restaurants) => restaurants.filter((restraunt) => restraunt?.data?.name.includes(searchText));


export const Home = () => {
    const [filteredRestraunts, setFilteredRestraunts] = useState([]);
    const [searchTxt, setSearchTxt] = useState("");

    const allRestraunts = useSelector(store => store.restraunt.restrauntList);
    const dispatch = useDispatch();

    useEffect(() => {
        getRestraunts();
    }, []);

    async function getRestraunts() {
        const data = await fetch("http://localhost:8080/api/rest/allRestraunts");
        const json = await data.json();
        const restaurantList = json.restaurants;
        // const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=8.579181&lng=76.877685&page_type=DESKTOP_WEB_LISTING");
        // const json = await data.json();
        // const restrauntList = json?.data.cards[2]?.data?.data?.cards;
        setFilteredRestraunts(restaurantList);
        dispatch(updateRestrauntList(restaurantList));
    }

    return (filteredRestraunts?.length === 0) 
    ? <Shimmer></Shimmer> 
    :(
        <>
        <div className='search-container'>
            <input 
                type='text' 
                placeholder='Search for Restraunts' 
                value={searchTxt} 
                onChange={(e) => setSearchTxt(e.target.value)} />
            <div className='buttons'>
                <button 
                    className='search-btn' 
                    onClick={() => {
                        const data = filterData(searchTxt, allRestraunts);
                        setFilteredRestraunts(data);
                    }}>
                    Search
                </button>
                <button 
                    className='clear-btn' 
                    onClick={() => {
                        setSearchTxt('');
                        setFilteredRestraunts(allRestraunts);
                    }}>
                    Clear
                </button>
            </div>
        </div>
        <div className='restraunt-list'>
            {
                filteredRestraunts?.map((restraunt, index) => (
                    <RestrauntCard  {...restraunt} key={restraunt.id} />
                ))
            }
        </div>
        </>
    )
}