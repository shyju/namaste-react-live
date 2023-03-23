import { useSelector } from "react-redux"

import { RestrauntCard } from "../RestrauntCard/RestrauntCard";
import './Favourites.css';

export const Favourites = () => {
    const favourites = useSelector(store => store.favourite?.favourites) ?? [];

    return (
        <div className="favourite-container">
            {
                favourites?.length > 0
                ? favourites?.map(({restaurant, id}) => (
                    <RestrauntCard {...restaurant} key={id} />
                  ))
                : <div className="no-favourites">
                    <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_207/empty_favorites_2x_sdbuxy" />
                    <h3>Where is the love?</h3>
                    <span>Once you favourite a restaurant, it will appear here.</span>
                  </div>
            }
        </div>
    )
}