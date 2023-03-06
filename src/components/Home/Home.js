import {RestrauntCard} from '../RestrauntCard/RestrauntCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';

import { updateRestrauntList } from '../../redux/restrauntSlice';
import { getRestaurants } from '../../services/fetch.service';

const filterData = (searchText, restaurants) => restaurants.filter((restraunt) => restraunt?.name.toUpperCase().includes(searchText.toUpperCase()));


export const Home = () => {
    const [filteredRestraunts, setFilteredRestraunts] = useState([]);
    const [searchTxt, setSearchTxt] = useState("");

    const allRestraunts = useSelector(store => store.restraunt.restrauntList);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllRestraunts();
    }, []);

    useEffect(() => {

        setTimeout(() => {
            getFilteredRestaurants();
        }, 1000)

        return () => clearInterval();
    }, [searchTxt])

    async function getFilteredRestaurants() {
        const data = await filterData(searchTxt, allRestraunts);
        setFilteredRestraunts(data);
    }

    async function getAllRestraunts() {
        const restaurantList = await getRestaurants();
        setFilteredRestraunts(restaurantList);
        dispatch(updateRestrauntList(restaurantList));
    }


    return (
        <>
            <div className='search-container'>
                <input 
                    type='text' 
                    placeholder='Search for Restraunts' 
                    value={searchTxt} 
                    onChange={(e) => setSearchTxt(e.target.value)} />
                <div className='buttons'>
                    {/* <button 
                        className='search-btn' 
                        onClick={async () => {
                            const data = await filterData(searchTxt, allRestraunts);
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
                    </button> */}
                </div>
            </div>
            {
                filteredRestraunts?.length && <div className='restraunt-list'>
                {
                    filteredRestraunts?.map((restraunt) => (
                        <RestrauntCard  {...restraunt} key={restraunt.id} />
                    ))
                }
                </div>    
            }
            
        </>
    )
}