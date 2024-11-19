import { assets } from '../../assets/assets';
import './AppDownload.css';
const AppDownload = () => {
    return (
        <div className="app-download" id='app-download'>
            <p>
                For Better Experience Download <br />Instrumentopedia
                <div className="app-download-paltforms">
                    <img src={assets.play_store} alt="" />
                    <img src={assets.app_store} alt="" />
                </div>
            </p>
        </div>)
}

export default AppDownload