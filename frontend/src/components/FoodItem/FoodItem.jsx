import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { Link } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img className='food-item-image' src={url + "/images/" + image} alt={name} />
                {
                    !cartItems[id]
                        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
                        : <div className='food-item-count'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
                        </div>
                }
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt="Rating" />
                    </div>
                    <p className='food-item-desc'>{description}</p>
                    <p className='food-item-price'>${price}</p>
                    <Link to={`/instrument/${id}`} className='view_more'>View Details</Link>
                </div>
            </div>
        </div>
    );
}

export default FoodItem;
