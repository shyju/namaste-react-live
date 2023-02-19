// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

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
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './components/Login/Login';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { useEffect } from 'react';
import { handleAuthentication } from './auth/auth-config';
import { User } from './redux/userSlice';
import { getUser } from './services/fetch.service';

const persistor = persistStore(store)
const AppLayout = () => {
    
    const dispatch = useDispatch();
    const navigate =  useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        const getAuthDetails = async () => {
          const response = await handleAuthentication();
          const { sub: auth_id, nickname, picture, email } = response;
          const id = await getUser(auth_id);
          console.log("Header:", JSON.stringify(response));
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
        //   checkIfLoggedIn();
        };
        getAuthDetails();
      }, []);
      
    //   const checkIfLoggedIn = () => {
    //     if (isLoggedIn) {
    //         navigate("/");
    //       } else {
    //         navigate("/login");
    //       }
    //   }


    // const isLoggedIn = useSelector(store => store.user.user.isLoggedIn);
    // const navigate = useNavigate();
    
    // useEffect(() => {
        
    // }, [])

    return (
       <>
            <ToastContainer position='top-center' className='toast-message' />
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