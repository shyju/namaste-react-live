import { OverlayTrigger, Popover } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/img/foodvilla.png';
import DownArrow from '../../assets/img/down-arrow.png';
import { AuthLogout } from '../../auth/auth-config';
import { Logout } from '../../redux/userSlice';
import './Header.css';

const Title = () => (
    <img 
        className='logo' 
        alt="Logo" 
        src={Logo}>
    </img>
)

export const AdminHeader = () => {
    const {nickname = '', picture = ''} = useSelector(store => store.user?.user) ?? {};
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await AuthLogout;
        dispatch(Logout())
    }

    return (
        <div className="admin-header">
            <Title/>
            <div className='header-right'>
                <div className='profile-pic' style={{display: 'flex', alignItems: 'center'}}>
                    <img src={picture} alt=""/>
                    <OverlayTrigger 
                        trigger='click'
                        key='bottom'
                        placement='bottom'
                        arrowOffset={20}
                        rootClose={true}
                        arrowProps={{ style: { backgroundColor: 'white' } }}
                        overlay={
                            <Popover style={{ padding: '10px' }}>
                            <Popover.Body>
                                <strong style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</strong>
                            </Popover.Body>
                            </Popover>
                        }
                        >
                        <div style={{marginLeft: '5px', fontWeight: '500', cursor: 'pointer'}}>
                            <span>Hey, {nickname} !</span>
                            <img style={{height: '20px',  'marginLeft': '5px'}} src={DownArrow} />
                        </div>
                    </OverlayTrigger>
                    
                </div>
            </div>
        </div>
    )
}