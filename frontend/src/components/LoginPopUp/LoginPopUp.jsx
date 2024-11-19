import { useContext, useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [termsAccepted, setTermsAccepted] = useState(false); // Checkbox state for terms and conditions

    // Input change handler
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Form submission handler
    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if (!termsAccepted) {
            alert("Please accept the terms and conditions.");
            return;
        }

        if (currentState === "Login") {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during request:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                <div className="login-popup-inputs">
                    {currentState === "Sign Up" && (
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder='Your Name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>

                <button type='submit'>
                    {currentState === "Sign Up" ? "Create Account" : "Login"}
                </button>

                <div className="login-popup-condition">
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                        required
                    />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currentState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopUp;
