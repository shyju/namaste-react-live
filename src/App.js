// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Outlet, useNavigate, Navigate} from 'react-router-dom';
import { Provider, useDispatch} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {HeaderComponent} from './components/Header/Header';
import {Home} from './components/Home/Home';
import {Footer} from './components/Footer/Footer';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';

import '/index.css'
import { Error } from './components/Error/Error';
import { RestrauntMenu } from './components/RestrauntDetails/RestrauntDetails';
import { Checkout } from './components/Checkout/Checkout';
import store from './redux/store';
import { toast, ToastContainer } from 'react-toastify';
import { Login } from './components/Login/Login';
import { AuthLogout, handleAuthentication, renewSession, renewSession } from './auth/auth-config';
import { Logout, User } from './redux/userSlice';
import { getUser } from './services/fetch.service';
import { Completion } from './components/Modals/Completion/Completion';

const persistor = persistStore(store)

const AppLayout = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getAuthDetails = async () => {
            try {
                const response = await handleAuthentication();
                const { sub: auth_id, nickname, picture, email } = response;
                const id = await getUser(auth_id);
                console.log("Header:", JSON.stringify(response));
                setIsLoggedIn(true);
                const user = {
                    id,
                    auth_id,
                    nickname,
                    picture,
                    email,
                    isLoggedIn: true,
                };
                
                dispatch(User(user));
                toast.success(`Welcome ${nickname}`);
            } catch {
                try {
                    const renewSessionResponse = await renewSession();
                    if (renewSessionResponse && renewSessionResponse.token) {
                        setIsLoggedIn(true);
                    }
                    console.log('renewSession', renewSessionResponse);
                } catch {
                    setIsLoggedIn(false);
                    const response = await AuthLogout();
                    dispatch(Logout())
                }
            }
        };
        getAuthDetails();
      }, []);

    return (
       <>
            {isLoggedIn && (
                <>
                    <ToastContainer position='top-center' className='toast-message' />
                    <HeaderComponent />
                    <Outlet />
                    <Footer />
                </>
            )}
       </>
    )
}

const appRouter = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error  />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/restraunt/:id',
                element: <RestrauntMenu />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: '/completion',
                element: <Completion />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <RouterProvider router={appRouter}/>
        </PersistGate>
    </Provider>
)