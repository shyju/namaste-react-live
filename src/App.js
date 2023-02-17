// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';

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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './components/Login/Login';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { useEffect } from 'react';

let persistor = persistStore(store)
const AppLayout = () => {

    // const isLoggedIn = useSelector(store => store.user.user.isLoggedIn);
    const navigate = useNavigate();
    const isLoggedIn = useSelector(store => store.user.user.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [])

    return (

       <>
            <ToastContainer position='top-left' className='toast-message' />
            <HeaderComponent />
            <Outlet />
            <Footer />
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