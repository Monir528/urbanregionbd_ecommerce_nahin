import "./Modal.scss"
import Button from '../Button/Button';
import { useSelector, useDispatch  } from 'react-redux';
import { modalClose } from '@/components/cartHandler';

const Modal = () => {
    const {cartHandler}= useSelector(state=>state.cartHandler) ||{}
    const dispatch= useDispatch()
    console.log(cartHandler);

    const handleClose=()=>{
        dispatch(modalClose())
    }
    
    return (
        <div className='Modal'>
            <div className='Container'>
                <div className="content">
                    <h1>Successfully</h1>
                    <img src="https://cdn.dribbble.com/users/129972/screenshots/3964116/75_smile.gif" alt="" />
                    <Button onClick={handleClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;