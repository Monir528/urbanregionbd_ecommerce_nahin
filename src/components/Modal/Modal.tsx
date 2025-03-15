import Button from '../Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { modalClose } from '@/components/cartHandler';

const Modal = () => {
    const { cartHandler } = useSelector(state => state.cartHandler) || {};
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(modalClose());
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen w-full'>
            <div className='bg-white w-11/12 max-w-md p-4 rounded-lg shadow-lg relative'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-xl font-semibold mb-4'>Successfully</h1>
                    <img
                        src="https://cdn.dribbble.com/users/129972/screenshots/3964116/75_smile.gif"
                        alt="Success"
                        className='w-4/5 object-cover'
                    />
                    <Button onClick={handleClose} className='mt-4'>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
