import './SideBar.css';
import { assets } from "../../assets/assets"
import { NavLink } from 'react-router-dom';
const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to='/add' className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add New Instruments</p>
                </NavLink>
                <NavLink to="/list" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>List Instruments</p>
                </NavLink>
                <NavLink to="/AllOrders" className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Order Details</p>
                </NavLink>
            </div>

        </div>
    )
}

export default SideBar