import { Link } from "react-router-dom"
import { IMG_CDN_URL } from "../../constants"
import './RestrauntCard.css';

import * as _ from 'lodash';

export const RestrauntCard = (restaurant) => {
    
    const {id, name, image_id , promoted, rating, delivery_time, price, restraunt_cuisines} = restaurant;
    const cuisines =_.map(restraunt_cuisines, ({ cuisine: { name } }) => name);
     return (
        <Link to={'/restraunt/' + id} key={id} className='restraunt-card'>
            {
                promoted ? <div className="promoted">promoted</div> : <></>
            }
            <div className='card-item' >
                <img src={IMG_CDN_URL + image_id} />
                <div className="restraunt-name">{name}</div>
                <div className="restraunt-cuisines">{cuisines.join(', ')}</div>
                <div className="details">
                    <div className="rating" style={rating >= 4 ? {backgroundColor: "#48c479"} : {}}>{rating} *</div>
                    <div>{delivery_time + ' MINS'}</div>
                    <div>{price}</div>
                </div>
                <div className="quick-view">
                    <span>QUICK VIEW</span>
                </div>
            </div>
        </Link>
    )
}