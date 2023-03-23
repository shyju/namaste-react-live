import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';

import { updateRestrauntList } from '../../redux/restrauntSlice';
import { getRestaurants } from '../../services/fetch.service';
import {RestrauntCard} from '../RestrauntCard/RestrauntCard';

const filterData = (searchText, restaurants) => restaurants.filter((restraunt) => restraunt?.name.toUpperCase().includes(searchText.toUpperCase()));


export const Home = () => {
    const dispatch = useDispatch();
    const inputElement = useRef();

    const [filteredRestraunts, setFilteredRestraunts] = useState([]);
    const [searchTxt, setSearchTxt] = useState("");

    const allRestraunts = useSelector(store => store.restraunt.restrauntList);

    const focusInput = () => inputElement.current.focus();

    useEffect(() => {
        focusInput();
        getAllRestraunts();
    }, []);

    useEffect(() => {
        const searchInterval = setTimeout(() => {
            getFilteredRestaurants();
        }, 1000)

        return () => clearInterval(searchInterval);
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
                    ref={inputElement}
                    type='text' 
                    placeholder='Search for Restraunts' 
                    value={searchTxt} 
                    onChange={(e) => setSearchTxt(e.target.value)} />
                <div className='buttons'>
                </div>
            </div>
            {
                filteredRestraunts?.length > 0 && <div className='restraunt-list'>
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