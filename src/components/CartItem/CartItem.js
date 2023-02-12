
import VegLogo from '../../assets/img/veg.png';
import NonVegLogo from '../../assets/img/non-veg.png';
import './CartItem.css';

export const CartItem = ({id, isVeg, name, quantity, price}) => (
    <div className="cart-list" key={id}>
        <div>
            <img src={isVeg === 1 ? VegLogo : NonVegLogo}></img>
            <span>{name}</span>
        </div>
        <div className='quantity'>{quantity}</div>
        <span>{'₹ ' + (price * quantity) / 100} </span>
    </div>
)