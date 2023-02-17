import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import * as _ from 'lodash';

import { login } from "../../redux/userSlice";
import Logo from '../../assets/img/foodvilla.png'
import './Login.css';
import { Authlogin, AuthSignUp } from "../../auth/auth-config";

export const Login = () => {


    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleLogin = async () => {
        if (_.isEmpty(username) && _.isEmpty(password)) {
            toast.warn('Enter username and password');
            return;    
        }
        if (_.isEmpty(username)) {
            toast.warn('Enter username');
            return;    
        }
        
        if (_.isEmpty(password)) {
            toast.warn('Enter password');
            return;    
        }
        
        
        const loginResponse = await Authlogin(username, password);
        dispatch(login());

    }

    const handleSignUp = async() => {
        const response = await AuthSignUp(username, password);
        // dispatch(login())
    }

    return (
        <>
            <ToastContainer/>
            <div className="login-container">
            <div className="login">
                <img src={Logo} />
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <div style={{display: isSignUp ? 'none' : ''}}>
                    <button className="login-btn" type="submit" onClick={handleLogin}>LOGIN</button>
                    <div className="sign-up">New User? <span onClick={() => setIsSignUp(true)}>SignUp</span></div>
                </div>

                <div style={{display: !isSignUp ? 'none' : ''}}>
                    <button className="signup-btn" type="submit" onClick={handleSignUp}>SIGN UP</button>
                    <div className="sign-in">Existing User? <span onClick={() => setIsSignUp(false)}>Sign In</span></div>
                </div>
                {/* <div className="google-signin">
                    <button className="google-signin-btn" onClick={handleLogin}>Sign in with Google</button>
                </div> */}
                
                
            </div>
            </div>
        </>

    )
}