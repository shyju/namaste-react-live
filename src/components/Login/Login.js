import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import * as _ from 'lodash';

import Logo from '../../assets/img/foodvilla.png'
import './Login.css';
import { Authlogin, AuthSignUp, FacebookLogin, GoogleLogin } from "../../auth/auth-config";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const Login = () => {
    
    const PARTICLE_OPTIONS = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 3
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "color": {
                "value": "#000000"
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#000000",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }
    
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
        
        
        const loginResponse = Authlogin(username, password);
        // dispatch(login());

    }

    const handleGoogleLogin = () => {
        GoogleLogin();
    }

    const handleFacebookLogin = () => {
        FacebookLogin()
    }

    const handleSignUp = async() => {
        AuthSignUp(username, password);
        // dispatch(login())
    }

    const particlesInit = async (main) => {
        console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };

    return (
        <>
            <ToastContainer/>
            <div className="login-container">
            <Particles
                id="tsparticles"
                init={particlesInit}

                options={PARTICLE_OPTIONS}
            >
            </Particles>
            <div className="login">
                <img src={Logo} />
                <input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <div style={{display: isSignUp ? 'none' : ''}}>
                    <button className="login-btn" type="submit" onClick={handleLogin}>LOGIN</button>
                    <div className="sign-up">New User? <span onClick={() => setIsSignUp(true)}>SignUp</span></div>
                </div>

                <div style={{display: !isSignUp ? 'none' : ''}}>
                    <button className="signup-btn" type="submit" onClick={handleSignUp}>SIGN UP</button>
                    <div className="sign-in">Existing User? <span onClick={() => setIsSignUp(false)}>Sign In</span></div>
                </div>
                <div className="social-signin">
                    <button className="google-signin-btn" onClick={handleGoogleLogin}>Sign in with Google</button>
                    <button className="facebook-signin-btn" onClick={handleFacebookLogin}>Sign in with Facebook</button>
                </div>
                
                
            </div>
            </div>
        </>

    )
}