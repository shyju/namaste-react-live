import offer_logo from '../../assets/img/offer.png'

export const Offers = ({restaurant_offers}) => {
    return (
        <div className="offer-section">
            <div className="offer-text">Offer</div>
            <div className="offers">
                    {
                        restaurant_offers?.map(({offer}, index) =>  (
                            <div className="offer-metadata" key={index}>
                                <img src={offer_logo}></img>
                                {/* <FontAwesomeIcon icon={faIdBadge} /> */}
                                <div>{offer?.description + ' | USE ' + offer?.coupon_code}</div>
                            </div>
                        ))
                    }
            </div>
        </div>
    )
}