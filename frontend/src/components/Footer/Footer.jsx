import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
    return (
        <div className="footer" id='footer'>
            <div className="footer-content">
                <div className='footer-content-left'>
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Odio quia cumque quod, veniam aperiam nemo beatae iusto porro
                        asperiores, architecto aut est id optio!
                        Natus quis voluptas atque. Voluptatibus, velit?</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul><li>+94772124403</li>
                        <li>contact@ kamalathasandilakshan@gmail.com</li></ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                copyright 2024 @ kamalathasandilakshan@gmail.com
            </p>
        </div>
    )
}

export default Footer