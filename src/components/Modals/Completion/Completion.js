
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";

import PaymentSuccess from '../../../assets/img/PaymentSuccess.gif';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TogglePaymentSuccessModal } from '../../../redux/uiSlice';


export const Completion = () => {
    const bodyStyle = { 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        opacity: '0.8',
        height: '350px',
    };
    const isModalOpen = useSelector(store => store.ui.isPaymentSuccessModalOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Modal show={isModalOpen} onHide={() => {
            dispatch(TogglePaymentSuccessModal());
            navigate('/checkout');
        }} centered size="sm">
            <Modal.Header closeButton style={{border: 'none'}}>
            <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body contentClassName='modal' style={bodyStyle}>
                <img src={PaymentSuccess} style= {{width: '200px'}}/>
                <p>Payment Successful</p>
                <Button style={{backgroundColor:'#60b246', fontSize: '17px', border: 'none'}} onClick={() => navigate('/')}>Continue Shopping</Button>
            </Modal.Body>
            <Modal.Footer style={{border: 'none'}}>
            {/* <Button variant="secondary" onClick={() => dispatch(TogglePaymentSuccessModal())}>
                Close
            </Button>
            <Button variant="primary" onClick={() => dispatch(TogglePaymentSuccessModal())}>
                Save Changes
            </Button> */}
            </Modal.Footer>
        </Modal>
    )
}