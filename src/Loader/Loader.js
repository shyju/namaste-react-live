import Spinner from './../assets/img/Spinner.gif';
import './Loader.css';
export const Loader = () => {
    return (
        <div className='loader-container'>
            <img src={Spinner}  style={{height: '100px'}}/>
        </div>
    )
}