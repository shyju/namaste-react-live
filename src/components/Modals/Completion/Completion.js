
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TogglePaymentSuccessModal } from '../../../redux/uiSlice';
import PaymentSuccess from '../../../assets/img/PaymentSuccess.gif';


export const Completion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isModalOpen = useSelector(store => store.ui.isPaymentSuccessModalOpen);

    const bodyStyle = { 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        opacity: '0.8',
        height: '350px',
    };
    
    const modalhandler = () => {
        dispatch(TogglePaymentSuccessModal());
        navigate('/checkout');
    };

    return (
        <Modal show={isModalOpen} onHide={modalhandler} centered size="sm">
            <Modal.Header closeButton style={{border: 'none'}} onClick={modalhandler}>
            <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body contentClassName='modal' style={bodyStyle}>
                <img src={PaymentSuccess} style= {{width: '200px'}}/>
                <p>Payment Successful</p>
                <Button style={{backgroundColor:'#60b246', fontSize: '17px', border: 'none'}} onClick={() => navigate('/home')}>Continue Shopping</Button>
            </Modal.Body>
            <Modal.Footer style={{border: 'none'}} />
        </Modal>
    )
}