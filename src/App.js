// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

import React, { useState, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import { Provider, useDispatch, useSelector} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as _ from 'lodash';

import {HeaderComponent} from './components/Header/Header';
import {Home} from './components/Home/Home';
import {Footer} from './components/Footer/Footer';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Error } from './components/Error/Error';
import { RestrauntMenu } from './components/RestrauntDetails/RestrauntDetails';
import { Checkout } from './components/Checkout/Checkout';
import store from './redux/store';
import { Login } from './components/Login/Login';
import { AuthLogout, handleAuthentication, renewSession, renewSession } from './auth/auth-config';
import { Logout } from './redux/userSlice';
import { getUser } from './services/fetch.service';
import { Completion } from './components/Modals/Completion/Completion';
import { MyAccount } from './components/MyAccount/MyAccount';
import { Admin } from './Admin/Admin';
import { AdminHeader } from './Admin/Header/Header';
import {User} from './Admin/Users/User';
import {User as UserAction} from './redux/userSlice';
import '/index.css'

const persistor = persistStore(store)

const AppLayout = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRole = useSelector(store => _.head(store.user?.user?.role) ?? '');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(userRole);
    

    useEffect(() => {
        const handleAuth = async () => {
            try {
                const response = await handleAuthentication();
                updateUserSession(response);
                toast.success(`Welcome ${nickname}`);
            } catch {
                try {
                    const renewSessionResponse = await renewSession();
                    updateUserSession(renewSessionResponse);
                    console.log('renewSession', renewSessionResponse);
                } catch {
                    setIsLoggedIn(false);
                    const response = await AuthLogout();
                    dispatch(Logout())
                }
            }
        };
        handleAuth();
      }, []);

      const updateUserSession = async (authResponse) => {
        const { sub: auth_id, nickname, picture, email, hasura_user_role } = authResponse;
        const id = await getUser(auth_id);
        console.log("Header:", JSON.stringify(authResponse));
        setIsLoggedIn(true);
        const user = {
            id,
            auth_id,
            nickname,
            picture,
            email,
            role: !_.isEmpty(hasura_user_role) ? hasura_user_role : ['user'],
            isLoggedIn: true,
        };
        const userRole = _.head(hasura_user_role) ?? 'user';
        setRole(userRole);
        dispatch(UserAction(user));
        userRole === 'admin' ? navigate('/admin') : navigate('/home');
      }

    return (
        <>
            {isLoggedIn && role === 'user' && (
                <>
                    <ToastContainer position='top-center' className='toast-message' />
                    <HeaderComponent />
                    <Outlet />
                    <Footer />
                </>
            )}

            {isLoggedIn && role === 'admin' && (
            <>
                <AdminHeader />
                <Outlet />
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
        children: [
            {
                path: '/admin',
                element: <Admin />
            },
            {
                path: '/users',
                element: <User />
            }
        ]
    },
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error  />,
        children: [
            {
                path: '/home',
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
            },
            {
                path: '/my-account',
                element: <MyAccount />
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