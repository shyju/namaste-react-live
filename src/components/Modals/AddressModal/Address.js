
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { ToggleAddresssModal } from '../../../redux/uiSlice';
import { addNewAddress, editAddress, getAddresses } from '../../../services/fetch.service';
import { populateAddress } from '../../../redux/addressSlice';


export const Address = ({pageType, addressId}) => {
    const groupStyle = {display: 'flex', justifyContent: 'space-between', width: '90%', marginRight: '10px'};
    const labelStyle = {fontSize: '15px', marginRight: '10px', width: '300px', textAlign: 'center' , alignSelf: 'center'};
    const buttonStyle = {backgroundColor: '#60b246', fontSize: 'bold' , border: 'none', width: '200px'};
    
    const isModalOpen = useSelector(store => store.ui.isAddressModalOpen);
    const userId = useSelector(store => store.user.user?.id);
    const {id, address_line_1, address_line_2, address_type, city: editCity, state: editState, pincode: editPincode} 
    = useSelector(store => _.find(store.address.addresses, {id: addressId})) ?? {};
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addressType, setAddressType] = useState('');
    const [houseName, setHouseName] = useState('');
    const [locality, setlocality] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');

    useEffect(() => {
        setFormData();
    }, [pageType])

    const setFormData = () => {
        if (pageType === 'edit') {
            setAddressType(address_type);
            setHouseName(address_line_1);
            setlocality(address_line_2);
            setCity(editCity);
            setState(editState);
            setPincode(editPincode);
        }
    }

    const handleClick = async () => {
        const address = {
            houseName,
            locality,
            city,
            state,
            pincode,
            addressType,
            isPrimary: false
        }

        const response = pageType === 'new' 
        ? await addNewAddress(userId, address)
        : await editAddress(addressId, userId, address);
        
        const {addresses} = await getAddresses(userId);
        dispatch(populateAddress(addresses));
        dispatch(ToggleAddresssModal());
    }

    return (
        <Modal show={isModalOpen} onHide={() => {
            dispatch(ToggleAddresssModal());
            navigate('/checkout');
        }} centered >
            <Modal.Header style={{border: 'none' , display: 'flex', justifyContent: 'center'}}>
                <Modal.Title style= {{textAlign: 'right'}}>{pageType === 'new' ?  `Add New Address` : `Edit Address`}</Modal.Title>
            </Modal.Header>
            <Modal.Body contentClassName='modal'>
                <Form.Group className="mb-3" controlId="formBasicEmail" style={groupStyle}>
                    <Form.Label style={labelStyle}>Address Type</Form.Label>
                    <Form.Select value={addressType} onChange={(e) =>{setAddressType(e.target.value)}} style={{cursor: 'pointer'}}>
                        <option value="">Select Address Type</option>
                        <option value='work'>Work</option>
                        <option value="home">Home</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail" style={groupStyle}>
                    <Form.Label style={labelStyle}>House Name</Form.Label>
                    <Form.Control type="text" value={houseName} onChange={(e) => setHouseName(e.target.value)} style={{cursor: 'pointer'}} />
                </Form.Group>
                <Form.Group  className="mb-3" controlId="formBasicEmail" style={groupStyle}>
                    <Form.Label style={labelStyle}>Locality</Form.Label>
                    <Form.Control type="text" value={locality} onChange={(e) => setlocality(e.target.value)} style={{cursor: 'pointer'}} />
                </Form.Group>
                <Form.Group  className="mb-3" controlId="formBasicEmail" style={groupStyle}>
                    <Form.Label style={labelStyle}>City</Form.Label>
                    <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} style={{cursor: 'pointer'}} />
                </Form.Group>
                <Form.Group  className="mb-3" controlId="formBasicEmail" style={groupStyle}>
                    <Form.Label style={labelStyle}>State</Form.Label>
                    <Form.Control type="text" value={state} onChange={(e) => setState(e.target.value)} style={{cursor: 'pointer'}} />
                </Form.Group>
                <Form.Group  className="mb-3" controlId="formBasicEmail" style={groupStyle}>
                    <Form.Label style={labelStyle}>Pincode</Form.Label>
                    <Form.Control type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer style={{border: 'none', display: 'flex', justifyContent: 'center'}}>
                <Button style={buttonStyle} onClick= {handleClick}>{pageType === 'new' ? 'Save' : 'Update'}</Button>
                <Button style={buttonStyle} onClick= {() => dispatch(ToggleAddresssModal())}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}