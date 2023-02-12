import {RestrauntCard} from '../RestrauntCard/RestrauntCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as _ from 'lodash';
import { Shimmer } from '../Shimmer/Shimmer';
import { updateRestrauntList } from '../../redux/restrauntSlice';
import { getRestaurants } from '../../services/fetch.service';

const filterData = (searchText, restaurants) => restaurants.filter((restraunt) => restraunt?.data?.name.includes(searchText));


export const Home = () => {
    const [filteredRestraunts, setFilteredRestraunts] = useState([]);
    const [searchTxt, setSearchTxt] = useState("");

    const allRestraunts = useSelector(store => store.restraunt.restrauntList);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllRestraunts();
    }, []);

    async function getAllRestraunts() {
        const restaurantList = await getRestaurants();
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